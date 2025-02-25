import { api } from '@/config/api';
import type { LoginPayload, LoginResponse } from './types';

export const login = ({ email, password }: LoginPayload) => {
  return api.post<LoginResponse>('auth/login', { email, password });
};
