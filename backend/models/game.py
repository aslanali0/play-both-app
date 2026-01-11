from typing import Optional
from pydantic import BaseModel


class Track(BaseModel):
    title: str
    youtube_url: Optional[str] = None


class Game(BaseModel):
    steam_id: str
    title: str
    image_url: str
    soundtrack: list[Track]
