from datetime import datetime
from fastapi import APIRouter

from models.game import FavoriteBase, FavoriteIn
from models.user import Token
from services.favorite_services import add_favorite_service, get_favorites_service
from utils.auth_utils import decode_access_token


router = APIRouter()


@router.post("/add")
async def add_favorite(favorite_data: FavoriteBase, token: str):
    email = decode_access_token(token)
    fav_in = FavoriteIn(
        **favorite_data.model_dump(), user_email=email, created_at=datetime.now()
    )
    return await add_favorite_service(fav_in)


@router.get("/my")
async def get_favorites(token: str):
    email = decode_access_token(token)
    return await get_favorites_service(email)
