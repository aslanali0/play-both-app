from pydantic import EmailStr
from app.database import favorite_collection
from models.game import FavoriteIn


async def add_favorite_service(favorite_data: FavoriteIn):
    existing_favorite = await favorite_collection.find_one(
        {
            "user_email": favorite_data.user_email,
            "song_youtube_url": favorite_data.song_youtube_url,
        }
    )
    if existing_favorite:
        return {"msg": "favorite already exist"}

    new_favorite = await favorite_collection.insert_one(favorite_data.model_dump())

    if new_favorite:
        return {"msg": "favorited complete"}


async def get_favorites_service(email: EmailStr):
    try:
        cursor = favorite_collection.find({"user_email": email}, {"_id": 0})
        favorites = await cursor.to_list()
    except Exception as e:
        return None
    if favorites:
        return favorites
    else:
        return None
