import Koa from 'koa';
import Router from '@koa/router';

import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/koa';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schema = buildSchema(readFileSync(join(__dirname, './schema.graphql'), 'utf-8'));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});

