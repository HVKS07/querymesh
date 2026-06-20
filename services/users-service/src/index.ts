import express from "express";

import { users } from "./users.js";

const app = express();
const port = 4002;

app.get("/health", (_request, response) => {
  console.log("users-service received GET /health");

  response.json({
    status: "ok",
    service: "users-service"
  });
});

app.get("/users/:id", (request, response) => {
  console.log(`users-service received GET /users/${request.params.id}`);

  const user = users.find((currentUser) => currentUser.id === request.params.id) ?? null;

  if (!user) {
    response.status(404).json({
      user: null
    });
    return;
  }

  response.json({
    user
  });
});

app.get("/users", (request, response) => {
  const idsParam = typeof request.query.ids === "string" ? request.query.ids : "";
  const ids = idsParam.split(",").filter(Boolean);

  console.log(`users-service received GET /users?ids=${ids.join(",")}`);

  const requestedUsers = ids.map((id) => {
    return users.find((user) => user.id === id) ?? null;
  });

  response.json({
    users: requestedUsers
  });
});

app.listen(port, () => {
  console.log(`Users service running at http://127.0.0.1:${port}`);
});
