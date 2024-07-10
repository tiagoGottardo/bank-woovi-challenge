import Koa, { Request } from 'koa'
import Router from '@koa/router'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { createHandler } from 'graphql-http/lib/use/koa'
import { renderPlaygroundPage } from 'graphql-playground-html'

import { getAccountByToken } from './authentication'
import { getContext } from './getContext'

import dotenv from 'dotenv'
dotenv.config()

import './database/config'

import typeDefs from './schemas/'
import resolvers from './resolvers/'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = new Koa()
const router = new Router()

router.all('/playground', async (ctx: Koa.Context) => {
  const endpoint = '/graphql'

  const playground = renderPlaygroundPage({
    endpoint
  })

  ctx.body = playground
})

router.all('/graphql', createHandler({
  schema,
  context: async (req: Request): Promise<any> => {
    const { account } = await getAccountByToken(req.headers.authorization)
    return getContext({ account, req })
  }
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
