import { GraphQLObjectType, GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql'
import { connectionArgs } from '@entria/graphql-mongo-helpers'

import { nodeField, nodesField } from '../modules/graphql/typeRegister'
import * as TransactionLoader from '../modules/transaction/TransactionLoader'
import { TransactionConnection } from '../modules/transaction/TransactionType'

const transactions: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(TransactionConnection.connectionType),
  args: { ...connectionArgs },
  resolve: async (_root, args, context) =>
    await TransactionLoader.loadAll(context, args),
}

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    transactions,
  }),
})
