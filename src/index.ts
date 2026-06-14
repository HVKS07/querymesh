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
  items: OrderItem[];
};

type OrderItem = {
  productId: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  inventoryStatus: string;
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

const products: Product[] = [
  {
    id: "p1",
    name: "GraphQL Starter Mug",
    price: 19.99,
    inventoryStatus: "IN_STOCK"
  },
  {
    id: "p2",
    name: "TypeScript Notebook",
    price: 29.99,
    inventoryStatus: "LOW_STOCK"
  }
];

const orders: Order[] = [
  {
    id: "101",
    status: "PROCESSING",
    total: 49.99,
    userId: "1",
    items: [
      { productId: "p1", quantity: 2 },
      { productId: "p2", quantity: 1 }
    ]
  },
  {
    id: "102",
    status: "SHIPPED",
    total: 129.5,
    userId: "2",
    items: [{ productId: "p2", quantity: 3 }]
  }
];

// The schema describes the GraphQL types and the queries clients can run.
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    inventoryStatus: String!
  }

  type OrderItem {
    productId: ID!
    quantity: Int!
    product: Product
  }

  type Order {
    id: ID!
    status: String!
    total: Float!
    userId: ID!
    user: User
    # Order.items is the list of products and quantities in this order.
    items: [OrderItem!]!
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
  },
  OrderItem: {
    // This nested resolver finds the full product for an item using productId.
    // Nested fields let clients ask for connected data in one GraphQL query.
    product: (parent: OrderItem) => {
      return products.find((product) => product.id === parent.productId) ?? null;
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
