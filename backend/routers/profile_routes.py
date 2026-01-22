from fastapi import APIRouter, Body

from models.user import Token, UserProfile, Profile
from services.profile_services import get_profile_service, update_service
from utils.auth_utils import decode_access_token


router = APIRouter()


@router.post("/update")
async def update_profile(token: str, bio: str = Body(""), avatar_url: str = Body("")):
    user_email = decode_access_token(token)
    user_profile = UserProfile(
        email=user_email, profile=Profile(bio=bio, avatar_url=avatar_url)
    )
    return await update_service(user_profile)


@router.get("/me")
async def get_profile(token: str):
    user_email = decode_access_token(token)
    return await get_profile_service(user_email)
