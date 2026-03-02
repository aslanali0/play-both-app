from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

from models.user import UserProfile, Annotated, BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class Comment(BaseModel):
    post_id: PyObjectId
    user: UserProfile
    likes: int = 0
    dislikes: int = 0


class Post(BaseModel):
    id: PyObjectId = Field(alias="_id")
    user: UserProfile
    content: str
    likes: int = 0
    dislikes: int = 0
    created_at: Optional[str] = datetime.now().isoformat()
