import { GraphQLFieldConfig, } from 'graphql'
import { AccountType } from 'modules/account/AccountType'

export const meQuery: GraphQLFieldConfig<any, any, any> = {
  type: AccountType,
  resolve: async (_root, _args, context) => {
    const { account } = context
    if (!account) { throw new Error("Token is not valid!") }
    return account
  }
}
