import { GraphQLObjectType } from 'graphql'

import * as accountMutations from '../modules/account/mutations'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
    ...accountMutations,
  }),
})
