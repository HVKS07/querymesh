import express from "express";

import { products } from "./products.js";

const app = express();
const port = 4001;

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "products-service"
  });
});

app.get("/products", (request, response) => {
  const idsParam = typeof request.query.ids === "string" ? request.query.ids : "";
  const ids = idsParam.split(",").filter(Boolean);

  // Return products in the same order as the requested ids.
  const requestedProducts = ids.map((id) => {
    return products.find((product) => product.id === id) ?? null;
  });

  response.json({
    products: requestedProducts
  });
});

app.listen(port, () => {
  console.log(`Products service running at http://localhost:${port}`);
});
