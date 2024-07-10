import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { AccountModel } from '../AccountModel'
import { generateJwtToken } from '../../../authentication'
import { accountSchema } from 'resolvers/zodSchemas'
import { z } from 'zod'
import { AccountType } from '../AccountType'

export const accountRegisterMutation = mutationWithClientMutationId({
  name: 'AccountRegister',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    cpf: { type: new GraphQLNonNull(GraphQLString) },
    account_key: { type: new GraphQLNonNull(GraphQLString) },
    date_of_birth: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args) => {
    try {
      const { email, cpf, account_key, ...rest } = accountSchema.parse(args)

      const hasAccount = (await AccountModel.countDocuments({
        $or: [
          { email },
          { cpf },
          { account_key }
        ]
      })) > 0

      if (hasAccount) { throw new Error('You already have an account.') }

      const account = new AccountModel({ email, cpf, account_key, ...rest })
      await account.save()

      const token = generateJwtToken(account)

      return {
        id: account._id,
        success: 'Successfully registered!',
        token,
      }
    } catch (e) {
      if (e instanceof z.ZodError) { throw new Error('Validation error:' + e.errors[0].message) }

      throw new Error('Failed to create account, ' + (e as Error).message)
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
      resolve: async ({ id }: any) => await AccountModel.findById(id),
    },
  },
})
