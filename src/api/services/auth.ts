import { api } from '../config';

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await api.post('auth/login', { email, password });

  return data;
};

export const register = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await api.post('auth/register', { email, password });

  return data;
};
