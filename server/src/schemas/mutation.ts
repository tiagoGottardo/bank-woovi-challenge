import { GraphQLObjectType } from 'graphql'

import * as accountMutations from '../modules/account/mutations'
import * as transactionMutations from '../modules/transaction/mutations'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    ...accountMutations,
    ...transactionMutations
  }),
})
