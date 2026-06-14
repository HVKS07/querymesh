import { products } from "../data/products.js";

// The service layer hides where product data comes from.
export const getProductsByIds = (ids: readonly string[]) => {
  return ids.map((id) => {
    return products.find((product) => product.id === id) ?? null;
  });
};
