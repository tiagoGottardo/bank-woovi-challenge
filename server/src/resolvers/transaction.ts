import { AccountModel } from '../models/Account'
import Transaction from '../models/Transaction'

import { DepositInput, WithdrawInput, TransferInput, GetTransactionsInput } from '../types/transaction'

const DEFAULT_LIMIT = 10

import { GraphQLContext } from 'modules/graphql/types'
import { Buffer } from 'buffer'

export const toCursor = (id: string) => {
  return Buffer.from(id).toString('base64')
}

export const fromCursor = (cursor: string) => {
  return Buffer.from(cursor, 'base64').toString('ascii')
}

export default {
  Query: {
    getTransactions: async (_: any, args: GetTransactionsInput, context: GraphQLContext) => {
      const { account } = context
      if (!account) { throw Error("Token is not valid!") }

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

      if (first) { limit = first }

      if (last) { limit = last }

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
    deposit: async (_: undefined, args: DepositInput, context: GraphQLContext) => {
      const { idempotencyKey, amount_in_cents } = args
      const { account } = context

      if (!account) { return "Token is not valid!" }
      if (amount_in_cents < 0) { return "Amount must be greater than 0." }

      const existingTransaction = await Transaction.findOne({ _id: idempotencyKey })
      if (existingTransaction) { return "That transaction already was done." }

      const newTransaction = new Transaction({
        _id: idempotencyKey,
        type: "deposit",
        amount_in_cents,
        sender_account_id: "external",
        receiver_account_id: account._id
      })

      await newTransaction.save()
      account.balance_in_cents += amount_in_cents
      await account.save()

      return "Deposit realized succesfully."
    },
    transfer: async (_: undefined, args: TransferInput, context: GraphQLContext) => {
      let { account } = context
      if (!account) { return "Token is not valid!" }

      const { idempotencyKey, amount_in_cents, description, receiver_account_key } = args

      if (amount_in_cents < 0) { return "Amount must be greater than 0." }

      const receiverAccount = await AccountModel.findOne({ account_key: receiver_account_key }).select("_id")
      if (!receiverAccount) { return "Receiver account not found." }

      if (account.balance_in_cents - amount_in_cents < 0) { return "Transaction amount is greater than your balance." }

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
      account.balance_in_cents -= amount_in_cents
      await account.save()
      await AccountModel.updateOne({ _id: receiverAccount._id }, { $inc: { balance_in_cents: amount_in_cents } })

      return "Transaction realized succesfully."
    },
    withdraw: async (_: undefined, args: WithdrawInput, context: GraphQLContext) => {
      const { idempotencyKey, amount_in_cents } = args
      let { account } = context
      if (!account) { return "Token is not valid!" }

      if (amount_in_cents < 0) { return "Amount must be greater than 0." }

      if (account.balance_in_cents - amount_in_cents < 0) { return "Your withdrawal amount is greater than your balance." }

      const existingTransaction = await Transaction.findOne({ _id: idempotencyKey })
      if (existingTransaction) { return "That transaction already was done." }

      const newTransaction = new Transaction({
        _id: idempotencyKey,
        type: "withdraw",
        amount_in_cents,
        sender_account_id: account._id,
        receiver_account_id: "external"
      })

      await newTransaction.save()
      account.balance_in_cents -= amount_in_cents
      await account.save()

      return "Withdraw realized succesfully."
    }
  }
}
