import { createContext } from 'react';
import { AuthContextType } from './interfaces/schemas';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ email: '' }),
  register: async () => ({ email: '' }),
  logout: async () => false,
});