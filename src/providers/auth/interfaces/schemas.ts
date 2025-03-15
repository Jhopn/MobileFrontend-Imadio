export interface User {
  id?: string;
  email: string;
  password?: string;
  name?: string;
  token?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: Credentials) => Promise<User>;
  register: (data: User) => Promise<User>;
  logout: () => Promise<boolean>;
}