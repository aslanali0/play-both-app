from fastapi import APIRouter, HTTPException
from app.database import user_collection
from utils.auth_utils import decode_access_token


router = APIRouter()


@router.get("/me")
async def get_user(token: str):
    email = decode_access_token(token)
    user = await user_collection.find_one({"email": email})
    if user:
        return {
            "email": user.get("email"),
            "username": user.get("username"),
            "profile": user.get(
                "profile",
                {
                    "avatar_url": None,
                    "bio": "",
                },
            ),
        }
    else:
        raise HTTPException(status_code=404)
