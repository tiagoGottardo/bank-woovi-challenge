import { mergeResolvers } from '@graphql-tools/merge'
import accountResolvers from './account'

const resolversArray = [
  accountResolvers
];

const resolvers = mergeResolvers(resolversArray)

export default resolvers
