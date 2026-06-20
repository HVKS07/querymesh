import type { User } from "../types.js";
import { fetchJson } from "../utils/httpClient.js";

type UserResponse = {
  user: User | null;
};

type UsersResponse = {
  users: Array<User | null>;
};

const usersServiceUrl = "http://127.0.0.1:4002";

// The service layer hides where user data comes from.
// The GraphQL gateway now fetches users from users-service over HTTP.
export const getUserById = async (id: string) => {
  console.log(`Gateway fetching user from users-service for id=${id}`);
  const url = `${usersServiceUrl}/users/${encodeURIComponent(id)}`;

  try {
    const data = await fetchJson<UserResponse>(url);
    return data.user;
  } catch (error) {
    throw new Error(`users-service request failed: GET ${url}`);
  }
};

// Used by userLoader to fetch many users with one HTTP request.
export const getUsersByIds = async (ids: readonly string[]) => {
  const idsParam = ids.map((id) => encodeURIComponent(id)).join(",");
  console.log(`Gateway fetching users from users-service for ids=${ids.join(",")}`);
  const url = `${usersServiceUrl}/users?ids=${idsParam}`;

  try {
    const data = await fetchJson<UsersResponse>(url);
    return data.users;
  } catch (error) {
    throw new Error(`users-service request failed: GET ${url}`);
  }
};
