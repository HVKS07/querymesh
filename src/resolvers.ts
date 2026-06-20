import { getOrderById, getOrders } from "./services/orderService.js";
import { getUserById } from "./services/userService.js";
import type { GraphQLContext, Order, OrderItem } from "./types.js";

// Resolvers contain the functions that return data for schema fields.
export const resolvers = {
  Query: {
    user: (_parent: unknown, args: { id: string }) => {
      return getUserById(args.id);
    },
    order: (_parent: unknown, args: { id: string }) => {
      return getOrderById(args.id);
    },
    orders: () => {
      return getOrders();
    }
  },
  Order: {
    // This nested resolver runs when a query asks for the user inside an order.
    user: (parent: Order, _args: unknown, context: GraphQLContext) => {
      console.log(`Resolving Order.user for userId=${parent.userId}`);
      return context.userLoader.load(parent.userId);
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
