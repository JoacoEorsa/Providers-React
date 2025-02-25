import type { LoginPayload } from './types';

export const login = ({ email, password }: LoginPayload) => {
  return Promise.resolve({
    data: { authToken: `super-encrypted-auth-token-for-${email}-${password}` },
  });
  // return api.post<LoginResponse>('auth/login', { email, password });
};
