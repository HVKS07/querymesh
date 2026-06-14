import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import DataLoader from "dataloader";

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

type GraphQLContext = {
  productLoader: DataLoader<string, Product | null>;
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
  },
  {
    id: "p3",
    name: "Apollo Server Hoodie",
    price: 59.99,
    inventoryStatus: "IN_STOCK"
  }
];

const orders: Order[] = [
  {
    id: "101",
    status: "PROCESSING",
    total: 149.95,
    userId: "1",
    items: [
      { productId: "p1", quantity: 2 },
      { productId: "p2", quantity: 1 },
      { productId: "p1", quantity: 1 },
      { productId: "p3", quantity: 1 },
      { productId: "p2", quantity: 2 }
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

const createProductLoader = () => {
  return new DataLoader<string, Product | null>(async (productIds) => {
    console.log(`Batch loading products for ids: ${productIds.join(",")}`);

    return productIds.map((productId) => {
      return products.find((product) => product.id === productId) ?? null;
    });
  });
};

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
      console.log(`Resolving Order.user for userId=${parent.userId}`);
      return users.find((user) => user.id === parent.userId) ?? null;
    }
  },
  OrderItem: {
    // This resolver still runs once per order item.
    // DataLoader batches and caches product lookups for this request.
    // Repeated productIds are deduplicated before the batch function runs.
    product: (parent: OrderItem, _args: unknown, context: GraphQLContext) => {
      console.log(`Resolving OrderItem.product for productId=${parent.productId}`);
      return context.productLoader.load(parent.productId);
    }
  }
};

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
