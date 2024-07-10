import { GraphQLObjectType } from 'graphql'
import { nodeField, nodesField } from '../modules/graphql/typeRegister'

import * as accountQueries from '../modules/account/queries'
import * as transactionQueries from '../modules/transaction/queries'

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    ...transactionQueries,
    ...accountQueries
  }),
})
