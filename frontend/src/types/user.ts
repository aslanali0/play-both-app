import type { BaseEntity } from './base';

export type UserRole = 'ADMIN' | 'USER';

export interface User extends BaseEntity {
  username: string,
  email: string,
  profile: UserProfile | null,
  
}

export interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
  handleLogout: () => void;
}

export interface UserProfile extends BaseEntity {
  bio: string;
  avatar_url: string;
}