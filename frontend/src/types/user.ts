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
  username: string
  bio: string;
  avatar_url: string;
}

export interface FriendshipRequest {
  sender: string,
  receiver: string
}
