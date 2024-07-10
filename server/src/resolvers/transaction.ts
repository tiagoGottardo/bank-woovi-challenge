import { AccountModel } from '../models/Account'
import Transaction from '../models/Transaction'

import { DepositInput, WithdrawInput, TransferInput, GetTransactionsInput, Context } from '../types/transaction'

const DEFAULT_LIMIT = 10

import { Buffer } from 'buffer'
import { getAccountByToken } from 'authentication'

export const toCursor = (id: string) => {
  return Buffer.from(id).toString('base64')
}

export const fromCursor = (cursor: string) => {
  return Buffer.from(cursor, 'base64').toString('ascii')
}

export default {
  Query: {
    getTransactions: async (_: any, args: GetTransactionsInput, context: Context) => {
      const account: any = getAccountByToken(context.token)
      if (!account) {
        throw Error("Token is not valid!")
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
      let account: any = getAccountByToken(context.token)
      if (!account) {
        throw Error("Token is not valid!")
      }

      const { idempotencyKey, amount_in_cents } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
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
      await AccountModel.updateOne({ _id: account._id }, { $inc: { balance_in_cents: amount_in_cents } })

      return "Deposit realized succesfully."
    },
    transfer: async (_: undefined, args: TransferInput, context: Context) => {
      let account: any = getAccountByToken(context.token)
      if (!account) {
        throw Error("Token is not valid!")
      }
      const { idempotencyKey, amount_in_cents, description, receiver_account_key } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
      }

      account = await AccountModel.findOne({ _id: account._id }).select("balance_in_cents")
      if (!account) {
        throw Error("Account not found.")
      }

      const receiverAccount = await AccountModel.findOne({ account_key: receiver_account_key }).select("_id")
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
      await AccountModel.updateOne({ _id: account._id }, { $inc: { balance_in_cents: -amount_in_cents } })
      await AccountModel.updateOne({ _id: receiverAccount._id }, { $inc: { balance_in_cents: amount_in_cents } })

      return "Transaction realized succesfully."
    },
    withdraw: async (_: undefined, args: WithdrawInput, context: Context) => {
      let account: any = getAccountByToken(context.token)
      if (!account) {
        throw Error("Token is not valid!")
      }
      const { idempotencyKey, amount_in_cents } = args

      if (amount_in_cents < 0) {
        throw Error("Amount must be greater than 0.")
      }

      account = await AccountModel.findOne({ _id: account._id }).select("balance_in_cents")
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
      await AccountModel.updateOne({ _id: account._id }, { $inc: { balance_in_cents: -amount_in_cents } })

      return "Withdraw realized succesfully."
    },
  }
}
