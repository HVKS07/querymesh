import DataLoader from "dataloader";

import { getUsersByIds } from "../services/userService.js";
import type { User } from "../types.js";

export const createUserLoader = () => {
  return new DataLoader<string, User | null>(async (userIds) => {
    console.log(`Batch loading users for ids: ${userIds.join(",")}`);
    return getUsersByIds(userIds);
  });
};
