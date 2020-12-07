import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { resolverMap } from '../src/resolvers';
import typeDefs from '../src/schemas';
import { makeExecutableSchema } from 'graphql-tools';

const createTestServer = () => {
  return createTestClient(new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolverMap,
    }),
    tracing: false,
    cacheControl: false,
    debug: true,
    introspection: true,
    playground: true,
  }));
}

describe('movies test', () => {
  it('fetch movies', async () => {

    const {query} = createTestServer();
  
    const MOVIES_QUERY = `query { 
      movies { 
        title
      }
    }`;
  
    const res = await query({ query: MOVIES_QUERY});
    expect(res).toMatchSnapshot();
  });
})

