import Koa from 'koa';
import Router from '@koa/router';

import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/koa';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const schema = buildSchema(readFileSync(join(process.cwd(), 'src/schema.graphql'), 'utf-8'));
const rootValue = {
  hello: () => 'Hello, world!',
};

const app = new Koa();
const router = new Router();

router.all('/graphql', createHandler({
  schema,
  rootValue,
}));

app.use(router.routes()).use(router.allowedMethods());

export default app;
