type User = {
  id: string;
  name: string;
  email: string;
};

// The users-service owns user data for now.
// Later, this could be replaced by a database or another data source.
export const users: User[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com"
  },
  {
    id: "2",
    name: "Grace Hopper",
    email: "grace@example.com"
  }
];
