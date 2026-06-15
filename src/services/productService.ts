import type { Product } from "../types.js";

type ProductsResponse = {
  products: Array<Product | null>;
};

const productsServiceUrl = "http://localhost:4001";

// The GraphQL gateway composes data from other services.
// This service hides the HTTP call to the products-service.
export const getProductsByIds = async (ids: readonly string[]) => {
  const idsParam = encodeURIComponent(ids.join(","));
  let response: Response;

  try {
    response = await fetch(`${productsServiceUrl}/products?ids=${idsParam}`);
  } catch (error) {
    throw new Error(
      `Products service is unreachable at ${productsServiceUrl}. Start it with npm run dev:products.`
    );
  }

  if (!response.ok) {
    throw new Error(`Products service request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products;
};
