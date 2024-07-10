import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { AccountModel } from '../AccountModel'
import { accountKeySchema } from '../../../resolvers/zodSchemas'
import { z } from 'zod'
import { GraphQLContext } from 'modules/graphql/types'

export const updateAccountKeyMutation = mutationWithClientMutationId({
  name: 'UpdateAccountKey',
  inputFields: {
    account_key: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ account_key }, { account }: GraphQLContext) => {
    if (!account) { return "Token is not valid!" }

    try {
      accountKeySchema.parse(account_key)

      const existingAccount = await AccountModel.findOne({ account_key })
      if (existingAccount) { throw new Error('An account already uses that key.') }

      account.account_key = account_key
      await account.save()

      return "Account key updated succesfully."
    } catch (e) {
      if (e instanceof z.ZodError) { throw new Error('Validation error:' + e.errors[0].message) }

      throw new Error('Failed to update account key, ' + (e as Error).message)
    }
  },
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: (success) => success,
    }
  }
})
