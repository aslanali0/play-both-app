from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class Track(BaseModel):
    game_title: str
    game_steam_id: str
    title: str
    album_title: Optional[str] = ""
    youtube_url: Optional[str] = None

class Album(BaseModel):
    album_title: str
    song_list: list[Track]


class Game(BaseModel):
    steam_id: str
    title: str
    image_url: str
    soundtrack: Optional[list[Album]] = None


class FavoriteBase(BaseModel):
    game_steam_id: str
    game_title: str
    song_title: str
    song_youtube_url: str


class FavoriteIn(FavoriteBase):
    user_email: EmailStr
    created_at: Optional[datetime] = None 
