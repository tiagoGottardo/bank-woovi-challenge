import { Request } from 'koa'
import { Account } from './modules/account/AccountModel'

import { GraphQLContext } from './modules/graphql/types'
import { getDataloaders } from './modules/loader/loaderRegister'

type CustomContext = {
  req?: Request
  account?: Account | null
}

export const getContext = async (ctx: CustomContext): Promise<GraphQLContext> => {
  const dataloaders = getDataloaders()

  return {
    dataloaders,
    req: ctx.req,
    account: ctx.account || null,
  }
}
