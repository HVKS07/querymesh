import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type User = {
  id: string;
  name: string;
  email: string;
};

type Order = {
  id: string;
  status: string;
  total: number;
  userId: string;
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

const orders: Order[] = [
  {
    id: "101",
    status: "PROCESSING",
    total: 49.99,
    userId: "1"
  },
  {
    id: "102",
    status: "SHIPPED",
    total: 129.5,
    userId: "2"
  }
];

// The schema describes the GraphQL types and the queries clients can run.
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Order {
    id: ID!
    status: String!
    total: Float!
    userId: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    order(id: ID!): Order
  }
`;

// Resolvers contain the functions that return data for schema fields.
const resolvers = {
  Query: {
    user: (_parent: unknown, args: { id: string }) => {
      return users.find((user) => user.id === args.id) ?? null;
    },
    order: (_parent: unknown, args: { id: string }) => {
      return orders.find((order) => order.id === args.id) ?? null;
    }
  },
  Order: {
    // This nested resolver runs when a query asks for the user inside an order.
    user: (parent: Order) => {
      return users.find((user) => user.id === parent.userId) ?? null;
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
