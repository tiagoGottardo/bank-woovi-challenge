import { Request } from 'koa'
import { Account } from '../account/AccountModel'
import { DataLoaders } from 'modules/loader/loaderRegister'

export type GraphQLContext = {
  dataloaders: DataLoaders
  req: Request | undefined,
  account: Account | null
}
