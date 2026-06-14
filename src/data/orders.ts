import type { Order } from "../types.js";

export const orders: Order[] = [
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
