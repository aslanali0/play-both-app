from fastapi import APIRouter, Body

from models.user import Token, UserProfile
from services.profile_services import get_profile_service, update_service
from utils.auth_utils import decode_access_token


router = APIRouter()


@router.post("/update")
async def update_profile(token: str, username: str = Body(""), bio: str = Body(""), avatar_url: str = Body("")):
    user_email = decode_access_token(token)
    if user_email:
        user_profile = UserProfile(
            username=username , bio=bio, avatar_url=avatar_url
            )
        return await update_service(user_profile)
    else:
        return {'msg': 'Authentication Failed'}


@router.get("/me")
async def get_current_profile(token: str, username: str):
    user_email = decode_access_token(token)
    if user_email:
        return await get_profile_service(username)
    else:
        return {'msg': 'Authentication Failed'}

@router.get("/user")
async def get_profile(username: str):
    return await get_profile_service(username)
