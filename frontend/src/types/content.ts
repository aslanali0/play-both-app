import type { BaseEntity } from './base'

export interface Game extends BaseEntity {
  steam_id: string,
  title: string,
  image_url: string | null,
  soundtrack: Array<Track>

}

export interface Track extends BaseEntity {
  title: string,
  youtube_url: string | null
} 
