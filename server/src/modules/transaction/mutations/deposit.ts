import { GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql'
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'

import { GraphQLContext } from '../../graphql/types'
import { TransactionModel } from '../TransactionModel'
import { TransactionConnection } from '../TransactionType'
import * as TransactionLoader from '../TransactionLoader'

export const depositMutation = mutationWithClientMutationId({
  name: 'Deposit',
  inputFields: {
    idempotencyKey: { type: new GraphQLNonNull(GraphQLID) },
    amount_in_cents: { type: new GraphQLNonNull(GraphQLInt) },
  },
  mutateAndGetPayload: async ({ idempotencyKey, amount_in_cents }, { account }: GraphQLContext) => {
    if (!account) { throw new Error("Token is not valid!") }
    if (amount_in_cents < 0) { throw new Error("Amount must be greater than 0.") }

    const existingTransaction = await TransactionModel.findOne({ _id: idempotencyKey })
    if (existingTransaction) { throw new Error("That transaction already was done.") }

    const newTransaction = new TransactionModel({
      _id: idempotencyKey,
      amount_in_cents,
      receiver_account_id: account._id
    })

    await newTransaction.save()
    account.balance_in_cents += amount_in_cents
    await account.save()

    return {
      id: newTransaction._id,
      success: "Deposit realized succesfully."
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
