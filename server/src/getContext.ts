import { Request } from 'koa'
import { Account } from './models/Account'
import { GraphQLContext } from './modules/graphql/types'

type CustomContext = {
  req?: Request
  account?: Account | null
}

export const getContext = async (ctx: CustomContext): Promise<GraphQLContext> => ({
  req: ctx.req,
  account: ctx.account || null,
})
