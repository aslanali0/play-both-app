from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class Track(BaseModel):
    title: str
    youtube_url: Optional[str] = None


class Game(BaseModel):
    steam_id: str
    title: str
    image_url: str
    soundtrack: list[Track]


class FavoriteBase(BaseModel):
    game_steam_id: str
    game_title: str
    song_title: str
    song_youtube_url: str


class FavoriteIn(FavoriteBase):
    user_email: EmailStr
    created_at: Optional[datetime] = None 
