type Product = {
  id: string;
  name: string;
  price: number;
  inventoryStatus: string;
};

// The products-service owns product data for now.
// Later, this file could be replaced by a database or another data source.
export const products: Product[] = [
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
