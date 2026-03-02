import type { BaseEntity } from "./base";
import type { UserProfile } from "./user";

export interface Comment extends BaseEntity {
  post_id: string;
}

export interface Post extends BaseEntity {
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
  user: UserProfile;
  created_at: Date;
}
