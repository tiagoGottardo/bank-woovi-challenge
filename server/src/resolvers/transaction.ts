import Account from '../models/Account'
import Transaction from '../models/Transaction'

import { DepositInput, WithdrawInput, TransferInput, GetTransactionsInput, Context } from '../types/transaction'
import jwt from 'jsonwebtoken'

const DEFAULT_LIMIT = 10
const JWT_SECRET = process.env.JWT_SECRET || 'other-secret'

const authenticate = (token: string | undefined) => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as { email: string }
    } catch (e) {
      return null
    }
  }

  return null
}
import { Buffer } from 'buffer'

export const toCursor = (id: string) => {
  return Buffer.from(id).toString('base64')
}

export const fromCursor = (cursor: string) => {
  return Buffer.from(cursor, 'base64').toString('ascii')
}

export default {
  Query: {
    getTransactions: async (_: any, args: GetTransactionsInput, context: Context) => {
      const emailAccount = authenticate(context?.token)?.email
      if (!emailAccount) {
        throw Error("Token is not valid!")
      }

      const account = await Account.findOne({ email: emailAccount }).select("_id")
      if (!account) {
        throw Error("Account not found.")
      }

      const { first, last, before, after } = args

      let query: any = {
        $or: [
          { sender_account_id: account._id },
          { receiver_account_id: account._id }
        ]
      }
      let limit: number | undefined

      if (after) {
        const afterCursor = fromCursor(after)
        query._id = { $gt: afterCursor }
      }

      if (before) {
        const beforeCursor = fromCursor(before)
        query._id = { $lt: beforeCursor }
      }

      if (first) {
        limit = first
      }

      if (last) {
        limit = last
      }

      const transactions = await Transaction.find(query)
        .sort({ timestamp: -1 })
        .limit(limit || DEFAULT_LIMIT)
        .exec()

      const hasNextPage = transactions.length === limit
      const startCursor = transactions.length > 0 ? toCursor(transactions[0]._id) : null
      const endCursor = transactions.length > 0 ? toCursor(transactions[transactions.length - 1]._id) : null

      return {
        edges: transactions.map(transaction => ({
          node: transaction,
          cursor: toCursor(transaction._id),
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage: !!before,
          startCursor,
          endCursor,
        },
      }
    },
  },
  Mutation: {
    deposit: async (_: undefined, args: DepositInput, context: Context) => {
      const emailAccount = authenticate(context?.token)?.email
      if (!emailAccount) {
        throw Error("Token is not valid!")
      }
      const { idempotencyKey, amount_in_cents } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
      }

      const account = await Account.findOne({ email: emailAccount })
      console.table(account)
      if (!account) {
        throw Error("Account not found.")
      }

      const existingTransaction = await Transaction.findOne({ _id: idempotencyKey })
      if (existingTransaction) {
        return "That transaction already was done."
      }

      const newTransaction = new Transaction({
        _id: idempotencyKey,
        type: "deposit",
        amount_in_cents,
        sender_account_id: "external",
        receiver_account_id: account._id
      })

      await newTransaction.save()
      await Account.updateOne({ email: emailAccount }, { $inc: { balance_in_cents: amount_in_cents } })

      return "Deposit realized succesfully."
    },
    transfer: async (_: undefined, args: TransferInput, context: Context) => {
      const emailAccount = authenticate(context?.token)?.email
      if (!emailAccount) {
        throw Error("Token is not valid!")
      }
      const { idempotencyKey, amount_in_cents, description, receiver_account_key } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
      }

      const account = await Account.findOne({ email: emailAccount }).select("balance_in_cents")
      if (!account) {
        throw Error("Account not found.")
      }

      const receiverAccount = await Account.findOne({ account_key: receiver_account_key }).select("_id")
      if (!receiverAccount) {
        throw Error("Receiver account not found.")
      }

      if ((account.balance_in_cents as number) - amount_in_cents < 0) {
        throw Error("Transaction amount is greater than your balance.")
      }

      const existingTransaction = await Transaction.findOne({ _id: idempotencyKey })
      if (existingTransaction) {
        return "That transaction already was done."
      }

      const newTransaction = new Transaction({
        _id: idempotencyKey,
        type: "transfer",
        amount_in_cents,
        description,
        sender_account_id: account._id,
        receiver_account_id: receiverAccount._id
      })

      await newTransaction.save()
      await Account.updateOne({ email: emailAccount }, { $inc: { balance_in_cents: -amount_in_cents } })
      await Account.updateOne({ _id: receiverAccount._id }, { $inc: { balance_in_cents: amount_in_cents } })

      return "Transaction realized succesfully."
    },
    withdraw: async (_: undefined, args: WithdrawInput, context: Context) => {
      const emailAccount = authenticate(context?.token)?.email
      if (!emailAccount) {
        throw Error("Token is not valid!")
      }
      const { idempotencyKey, amount_in_cents } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
      }

      const account = await Account.findOne({ email: emailAccount }).select("balance_in_cents")
      console.table(account)
      if (!account) {
        throw Error("Account not found.")
      }

      if ((account.balance_in_cents as number) - amount_in_cents < 0) {
        throw Error("Your withdrawal amount is greater than your balance.")
      }

      const existingTransaction = await Transaction.findOne({ _id: idempotencyKey })
      if (existingTransaction) {
        return "That transaction already was done."
      }

      const newTransaction = new Transaction({
        _id: idempotencyKey,
        type: "withdraw",
        amount_in_cents,
        sender_account_id: account._id,
        receiver_account_id: "external"
      })

      await newTransaction.save()
      await Account.updateOne({ email: emailAccount }, { $inc: { balance_in_cents: -amount_in_cents } })

      return "Withdraw realized succesfully."
    },
  }
}
