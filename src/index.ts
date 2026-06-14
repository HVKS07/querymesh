import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { createProductLoader } from "./loaders/productLoader.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";
import type { GraphQLContext } from "./types.js";

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      productLoader: createProductLoader()
    };
  }
});

console.log(`QueryMesh GraphQL endpoint: ${url}`);
