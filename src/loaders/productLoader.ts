import DataLoader from "dataloader";

import { products } from "../data/products.js";
import type { Product } from "../types.js";

export const createProductLoader = () => {
  return new DataLoader<string, Product | null>(async (productIds) => {
    console.log(`Batch loading products for ids: ${productIds.join(",")}`);

    return productIds.map((productId) => {
      return products.find((product) => product.id === productId) ?? null;
    });
  });
};
