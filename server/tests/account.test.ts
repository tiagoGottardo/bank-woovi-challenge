import request from 'supertest';
import app from '../src/app';

describe('GraphQL API', () => {
  it('should return hello message', async () => {
    const query = `
      query {
        hello
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data).toEqual({ hello: 'Hello, world!' });
  });
});
