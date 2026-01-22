import type { BaseEntity } from './base';

export type UserRole = 'ADMIN' | 'USER';

export interface User extends BaseEntity {
  username: string,
  email: string,
  bio: string;
  avatar_url: string,
  favorites: []
}

export interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
}
