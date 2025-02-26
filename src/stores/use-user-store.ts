import { create } from 'zustand';

interface User {
  email: string;
  name: string;
}

interface Actions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  reset: () => void;
}

interface State {
  user: User | null;
  token: string | null;
}

export const useUserStore = create<State & Actions>()((set) => {
  return {
    user: null,
    token: null,

    setUser: (user: User | null) => {
      set(() => {
        return { user };
      });
    },
    setToken: (token: string | null) => {
      set(() => {
        return { token };
      });
    },
    reset: () => {
      set({ user: null, token: null });
    },
  };
});
