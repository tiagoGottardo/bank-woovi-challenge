import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { connectionDefinitions } from '@entria/graphql-mongo-helpers'

import { Account } from './AccountModel'
import { load } from './AccountLoader'
import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister'

export const AccountType = new GraphQLObjectType<Account>({
  name: 'Account',
  description: 'Account Type',
  fields: () => ({
    id: globalIdField('Account'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.name,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.password,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.email,
    },
    cpf: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.cpf,
    },
    balance_in_cents: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.balance_in_cents,
    },
    account_key: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.account_key,
    },
    date_of_birth: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (account) => account.date_of_birth,
    }
  }),
  interfaces: () => [nodeInterface],
})

registerTypeLoader(AccountType,
  load)

export const AccountConnection = connectionDefinitions({
  name: 'Account',
  nodeType: AccountType,
})
