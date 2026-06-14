import { users } from "../data/users.js";

// The service layer hides where user data comes from.
export const getUserById = (id: string) => {
  return users.find((user) => user.id === id) ?? null;
};
