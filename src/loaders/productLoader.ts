import DataLoader from "dataloader";

import { getProductsByIds } from "../services/productService.js";
import type { Product } from "../types.js";

export const createProductLoader = () => {
  return new DataLoader<string, Product | null>(async (productIds) => {
    console.log(`Batch loading products for ids: ${productIds.join(",")}`);
    return getProductsByIds(productIds);
  });
};
