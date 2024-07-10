import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import bcrypt from 'bcryptjs'
import { GraphQLContext } from 'modules/graphql/types'

export const deleteAccountMutation = mutationWithClientMutationId({
  name: 'DeleteAccountKey',
  inputFields: {
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ password }, { account }: GraphQLContext) => {
    if (!account) { return "Token is not valid!" }

    const valid = await bcrypt.compare(password, account.password)
    if (!valid) { throw new Error('Invalid password') }

    if (account.balance_in_cents !== 0) {
      throw new Error('Balance is positive, it must be 0. Withdraw all your money and try again.')
    }

    await account.deleteOne()

    return "Account deleted succesfully."
  },
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: (success) => success,
    }
  }
})
