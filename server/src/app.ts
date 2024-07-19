import Koa, { Request } from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'

import { createHandler } from 'graphql-http/lib/use/koa'
import { renderPlaygroundPage } from 'graphql-playground-html'

import { getAccountByToken } from './authentication'
import { getContext } from './getContext'

import { schema } from './schemas/schema'

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
    console.log("Req")
    const { account } = await getAccountByToken(req.headers.authorization)
    return getContext({ account, req })
  }
}))

app
  .use(cors({
    origin: '*', // Adjust this to match your frontend URL
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  }))
  .use(router.routes())
  .use(router.allowedMethods())


export default app
