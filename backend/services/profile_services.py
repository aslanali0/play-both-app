from app.database import profile_collection
from pydantic import EmailStr

from models.user import Token, UserProfile
from utils.auth_utils import decode_access_token


async def update_service(user: UserProfile):
    updated_data = {}
    if user.bio:
        updated_data["bio"] = user.bio
    if user.avatar_url:
        updated_data["avatar_url"] = user.avatar_url

    response = await profile_collection.update_one(
        {"username": user.username}, {"$set": updated_data},
    upsert=True)

    return {"msg": "User updated", "updated_data": updated_data}



async def get_profile_service(username: str):
    user = await profile_collection.find_one({"username": username})
    if user:
        user_profile = UserProfile(
            username=user.get("username"),
            bio=user.get("bio"),
            avatar_url=user.get("avatar_url"),
        )
        return user_profile
    else:
        return None
