from services.logic import aggregate_game_and_songs
from .steam_service import search_game
from app.database import game_collection, song_collection
from .scraper_service import get_albums


async def get_game_and_songs(game_name: str):
    game = await aggregate_game_and_songs(game_name)
    if game:
        existing_game = await game_collection.find_one(
            {"steam_id": game.get("steam_id")}
        )
        if existing_game:
            existing_game.pop("_id", None)
            return existing_game
        else:
            await game_collection.insert_one(game)
            game.pop("_id", None)
            return game
    else:
        return None
