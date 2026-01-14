import type { BaseEntity } from './base';

export type UserRole = 'ADMIN' | 'USER';

export interface User extends BaseEntity {
  username: string,
  email: string,
}
