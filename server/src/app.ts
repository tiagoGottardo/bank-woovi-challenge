import Koa from 'koa'
import Router from '@koa/router'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { createHandler } from 'graphql-http/lib/use/koa'

import { renderPlaygroundPage } from 'graphql-playground-html';
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import './database/config'

import typeDefs from './schemas/'
import resolvers from './resolvers/'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = new Koa()
const router = new Router()

const authenticate = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const token = ctx.headers.authorization?.replace('Bearer ', '') || ''

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    ctx.user = decoded;
  } catch (e) {
    ctx.user = null;
  }

  await next();
};

app.use(authenticate);

router.all('/playground', async (ctx: Koa.Context) => {
  const endpoint = '/graphql';
  // const context = { user: ctx?.user };

  const playground = renderPlaygroundPage({
    endpoint,
  });

  ctx.body = playground;
});


router.all('/graphql', createHandler({
  schema,
  context: (ctx: any) => ({
    user: ctx?.user,
  })
}))

app.use(router.routes()).use(router.allowedMethods())

export default app
