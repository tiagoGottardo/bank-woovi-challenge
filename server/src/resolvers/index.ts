import { mergeResolvers } from '@graphql-tools/merge'
import nameResolvers from './name'

const resolversArray = [
  nameResolvers
];

const resolvers = mergeResolvers(resolversArray)

export default resolvers
