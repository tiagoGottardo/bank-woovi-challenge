import Koa from 'koa'
import Router from '@koa/router'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { createHandler } from 'graphql-http/lib/use/koa'

import { renderPlaygroundPage } from 'graphql-playground-html'

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
  context: (ctx: any) => ({
    token: ctx?.headers?.authorization
  })
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
