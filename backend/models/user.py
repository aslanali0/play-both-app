from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import Annotated, Optional
from bson import ObjectId

from models.game import Track


PyObjectId = Annotated[str, BeforeValidator(str)]


class UserBase(BaseModel):
    username: str = Field(..., min_length=4, max_length=20)
    email: EmailStr
    model_config = {"populate_by_name": True, "from_attributes": True}


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=50)


class UserIn(UserBase):
    hashed_password: str


class UserOut(UserBase):
    id: PyObjectId = Field(alias="_id")


class UserProfile(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    favorites: list[Track] = []


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=50)


class Token(BaseModel):
    access_token: str
    token_type: str
