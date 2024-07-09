import { mergeResolvers } from '@graphql-tools/merge'
import accountResolvers from './account'
import transactionResolvers from './transaction'

const resolversArray = [
  accountResolvers,
  transactionResolvers
]

const resolvers = mergeResolvers(resolversArray)

export default resolvers
