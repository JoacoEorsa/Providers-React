import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStoreState = {
  token: string | null;
};

const useAuthStore = create<AuthStoreState>()(
  persist(
    (_) => {
      return { token: null };
    },
    { name: "auth" },
  ),
);

export const getAuthStoreState = () => {
  return useAuthStore.getState();
};

export const useAuthStoreToken = () => {
  return useAuthStore((s) => {
    return s.token;
  });
};

export const setAuthStoreToken = (token: string | null) => {
  return useAuthStore.setState(() => {
    return { token };
  });
};
