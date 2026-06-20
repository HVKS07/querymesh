import type { User } from "../types.js";

type UserResponse = {
  user: User | null;
};

const usersServiceUrl = "http://127.0.0.1:4002";

// The service layer hides where user data comes from.
// The GraphQL gateway now fetches users from users-service over HTTP.
export const getUserById = async (id: string) => {
  console.log(`Gateway fetching user from users-service for id=${id}`);

  let response: Response;

  try {
    response = await fetch(`${usersServiceUrl}/users/${encodeURIComponent(id)}`);
  } catch (error) {
    throw new Error(
      `Users service is unreachable at ${usersServiceUrl}. Start it with npm run dev:users.`
    );
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Users service request failed with status ${response.status}`);
  }

  const data = (await response.json()) as UserResponse;
  return data.user;
};
