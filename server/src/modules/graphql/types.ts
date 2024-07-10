import { Request } from 'koa'
import { Account } from '../../models/Account'

export type GraphQLContext = {
  req: Request | undefined,
  account: Account | null
}
