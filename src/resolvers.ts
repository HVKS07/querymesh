import { orders } from "./data/orders.js";
import { users } from "./data/users.js";
import type { GraphQLContext, Order, OrderItem } from "./types.js";

// Resolvers contain the functions that return data for schema fields.
export const resolvers = {
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
