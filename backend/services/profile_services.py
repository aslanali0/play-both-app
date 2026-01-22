from app.database import user_collection
from pydantic import EmailStr

from models.user import Token, UserProfile
from utils.auth_utils import decode_access_token


async def update_service(user: UserProfile):
    user_db = await user_collection.find_one({"email": user.email})
    if user_db:
        updated_data = {}
        if user.profile.bio:
            updated_data["profile.bio"] = user.profile.bio
        if user.profile.avatar_url:
            updated_data["profile.avatar_url"] = user.profile.avatar_url

        response = await user_collection.update_one(
            {"email": user.email}, {"$set": updated_data}
        )

        return {"msg": "User updated", "updated_data": updated_data}
    else:
        return None


async def get_profile_service(email: EmailStr):
    user = await user_collection.find_one({"email": email})
    if user:
        user_profile = UserProfile(
            username=user.get("username"),
            email=email,
            bio=user.get("profile").get("bio"),
            avatar_url=user.get("profile").get("avatar_url"),
        )
        return user_profile
    else:
        return None
