from datetime import datetime
from fastapi import APIRouter

from models.game import FavoriteBase, FavoriteIn
from models.user import Token
from services.favorite_services import add_favorite_service, get_favorites_service
from utils.auth_utils import decode_access_token
from services.favorite_services import remove_favorite_service

router = APIRouter()


@router.post("/add")
async def add_favorite(favorite_data: FavoriteBase, token: str, username: str):
    email = decode_access_token(token)
    if email:
        fav_in = FavoriteIn(
            **favorite_data.model_dump(), username=username, created_at=datetime.now()
        )
        return await add_favorite_service(fav_in)
    else:
        return {'msg': 'Authentication failed, favorite not added'}


@router.get("/my")
async def get_favorites(username: str, token: str):
    email = decode_access_token(token)
    if email:
        return await get_favorites_service(username)
    else:
        return {'msg': 'Authentication failed'}

@router.post("/remove")
async def remove_favorite(favorite_data: FavoriteBase, token: str, username: str):
    email = decode_access_token(token)
    if email:
        fav_in = FavoriteIn(
            **favorite_data.model_dump(), username=username
        )
        return await remove_favorite_service(fav_in)
    else:
        return {'msg': 'Authentication failed, favorite not removed'}
