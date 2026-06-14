import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type User = {
  id: string;
  name: string;
  email: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com"
  },
  {
    id: "2",
    name: "Grace Hopper",
    email: "grace@example.com"
  }
];

// The schema describes the GraphQL types and the queries clients can run.
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
  }
`;

// Resolvers contain the functions that return data for schema fields.
const resolvers = {
  Query: {
    user: (_parent: unknown, args: { id: string }) => {
      return users.find((user) => user.id === args.id) ?? null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`QueryMesh GraphQL endpoint: ${url}`);
