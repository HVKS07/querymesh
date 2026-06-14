import { orders } from "../data/orders.js";

// The service layer hides where order data comes from.
export const getOrderById = (id: string) => {
  return orders.find((order) => order.id === id) ?? null;
};
