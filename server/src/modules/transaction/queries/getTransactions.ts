import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers'

import * as TransactionLoader from '../TransactionLoader'
import { TransactionConnection } from '../TransactionType'

export const getTransactionsQuery: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(TransactionConnection.connectionType),
  args: { ...connectionArgs },
  resolve: async (_root, args, context) => {
    const { account } = context
    if (!account) { throw new Error("Token is not valid!") }

    return await TransactionLoader.loadAll(context, withFilter(args, {
      $or: [{ sender_account: account._id, },
      { receiver_account: account._id, },],
    }))
  }
}
