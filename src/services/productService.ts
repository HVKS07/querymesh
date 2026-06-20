import type { Product } from "../types.js";
import { fetchJson } from "../utils/httpClient.js";

type ProductsResponse = {
  products: Array<Product | null>;
};

const productsServiceUrl = "http://127.0.0.1:4001";

// The GraphQL gateway composes data from other services.
// This service hides the HTTP call to the products-service.
export const getProductsByIds = async (ids: readonly string[]) => {
  const idsParam = ids.map((id) => encodeURIComponent(id)).join(",");
  const url = `${productsServiceUrl}/products?ids=${idsParam}`;

  try {
    const data = await fetchJson<ProductsResponse>(url);
    return data.products;
  } catch (error) {
    throw new Error(`products-service request failed: GET ${url}`);
  }
};
