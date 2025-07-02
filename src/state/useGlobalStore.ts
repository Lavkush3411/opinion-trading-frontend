import { create } from "zustand";
import { UserType } from "../types/api.types";

interface GlobalStore {
  userId: string | null;
  setUserId: (userId: string) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));