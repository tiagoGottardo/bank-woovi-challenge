import { GraphQLNonNull, GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { connectionDefinitions, timestampResolver } from '@entria/graphql-mongo-helpers'

import { TransactionDocument } from './TransactionModel'
import { load } from './TransactionLoader'
import { AccountType } from '../account/AccountType'
import * as AccountLoader from '../account/AccountLoader'
import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister'

export const TransactionType = new GraphQLObjectType<TransactionDocument>({
  name: 'Transaction',
  description: 'Transaction Type',
  fields: () => ({
    id: globalIdField('Transaction'),
    amount_in_cents: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (transaction) => transaction.amount_in_cents,
    },
    sender_account: {
      type: AccountType,
      resolve: (transaction, _, context) => AccountLoader.load(context, transaction.sender_account._id),
    },
    receiver_account: {
      type: AccountType,
      resolve: (transaction, _, context) => AccountLoader.load(context, transaction.receiver_account._id),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ createdAt }) => createdAt.toISOString()
    }
  }),
  interfaces: () => [nodeInterface],
})

registerTypeLoader(TransactionType, load)

export const TransactionConnection = connectionDefinitions({
  name: 'Transaction',
  nodeType: TransactionType,
})
