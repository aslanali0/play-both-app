from fastapi import APIRouter
from services.game_service import get_game_and_songs
from models.game import Game

router = APIRouter()


@router.get("/search")
async def search_game_info(game_name: str):
    game = await get_game_and_songs(game_name)
    if game:
        return game
    else:
        return {"msg": "Game not found. Please type the exact name of the game."}
