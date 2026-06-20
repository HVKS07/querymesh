import type DataLoader from "dataloader";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  status: string;
  total: number;
  userId: string;
  items: OrderItem[];
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  inventoryStatus: string;
};

export type GraphQLContext = {
  productLoader: DataLoader<string, Product | null>;
  userLoader: DataLoader<string, User | null>;
};
