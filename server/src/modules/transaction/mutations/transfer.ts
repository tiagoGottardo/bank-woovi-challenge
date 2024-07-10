import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { GraphQLContext } from '../../graphql/types'
import { AccountModel } from 'modules/account/AccountModel'
import { TransactionModel } from '../TransactionModel'
import { TransactionConnection } from '../TransactionType'
import * as TransactionLoader from '../TransactionLoader'

export const transferMutation = mutationWithClientMutationId({
  name: 'Transfer',
  inputFields: {
    idempotencyKey: { type: new GraphQLNonNull(GraphQLID) },
    amount_in_cents: { type: new GraphQLNonNull(GraphQLInt) },
    receiver_account_key: { type: new GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: async (args, { account }: GraphQLContext) => {
    const { idempotencyKey, amount_in_cents, receiver_account_key } = args

    if (!account) { throw new Error("Token is not valid!") }
    if (amount_in_cents < 0) { throw new Error("Amount must be greater than 0.") }

    const receiverAccount = await AccountModel.findOne({ account_key: receiver_account_key }).select("_id")
    if (!receiverAccount) { throw new Error("Receiver account not found.") }

    if (account.balance_in_cents - amount_in_cents < 0) { throw new Error("Transaction amount is greater than your balance.") }

    const existingTransaction = await TransactionModel.findOne({ _id: idempotencyKey })
    if (existingTransaction) { throw new Error("That transaction already was done.") }

    const newTransaction = new TransactionModel({
      _id: idempotencyKey,
      amount_in_cents,
      sender_account_id: account._id,
      receiver_account_id: receiverAccount._id
    })

    await newTransaction.save()
    account.balance_in_cents -= amount_in_cents
    await account.save()
    await AccountModel.updateOne({ _id: receiverAccount._id }, { $inc: { balance_in_cents: amount_in_cents } })

    return {
      id: newTransaction._id,
      success: "Transaction realized succesfully."
    }
  },
  outputFields: () => ({
    postEdge: {
      type: TransactionConnection.edgeType,
      resolve: async ({ id }: any, _, context) => {
        const transaction = await TransactionLoader.load(context, id)
        if (!transaction) { return null }

        return {
          cursor: toGlobalId('Transaction', transaction._id),
          node: transaction,
        }
      }
    }
  })
})
