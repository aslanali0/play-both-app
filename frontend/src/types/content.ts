import type { BaseEntity } from "./base";

export interface Game extends BaseEntity {
  steam_id: string;
  title: string;
  image_url: string | null;
  soundtrack: Array<Album>;
}

export interface Song extends BaseEntity {
  game_steam_id?: string;
  game_title?: string;
  title: string;
  album_title: string;
  youtube_url: string | null;
}

export interface Favorite extends BaseEntity {
  game_steam_id: string;
  game_title: string;
  song_title: string;
  song_youtube_url: string;
}

export interface Album extends BaseEntity {
  album_title: string;
  song_list: Array<Song>;
}
