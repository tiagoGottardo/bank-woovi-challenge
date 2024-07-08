import Koa from 'koa'
import Router from '@koa/router'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { createHandler } from 'graphql-http/lib/use/koa'

import typeDefs from './schemas/'
import resolvers from './resolvers/'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = new Koa()
const router = new Router()

router.all('/graphql', createHandler({
  schema,
  rootValue: {}
}));

app.use(router.routes()).use(router.allowedMethods())

export default app
