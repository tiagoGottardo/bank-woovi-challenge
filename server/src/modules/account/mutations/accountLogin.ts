import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import bcrypt from 'bcryptjs'

import { AccountModel } from '../AccountModel'
import { generateJwtToken } from '../../../authentication'
import { AccountType } from '../AccountType'

export const accountLoginMutation = mutationWithClientMutationId({
  name: 'AccountLogin',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }) => {

    const account = await AccountModel.findOne({ email })
    if (!account) { throw new Error('Account not found!') }

    const valid = await bcrypt.compare(password, account.password)
    if (!valid) { throw new Error('Invalid password!') }

    const token = generateJwtToken(account)
    return {
      account,
      success: 'Successfully logged!',
      token,
    }
  },
  // TODO: Remove this any type
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }: any) => token,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: any) => success,
    },
    me: {
      type: AccountType,
      resolve: async ({ account }: any) => account,
    },
  },
})
