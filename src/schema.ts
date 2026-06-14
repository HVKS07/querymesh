// The schema describes the GraphQL types and the queries clients can run.
export const typeDefs = `#graphql
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
