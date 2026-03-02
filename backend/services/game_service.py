from services.logic import aggregate_game_and_songs
from .steam_service import search_game
from app.database import game_collection


async def get_game_and_songs(game_name: str):
    try:
        game_searched = await search_game(game_name)
        print("searched")
        existing_game = await game_collection.find_one(
            {"steam_id": game_searched.get("steam_id")}
        )
        if existing_game:
            print("existing found")
            existing_game.pop("_id", None)
            return existing_game
        game = await aggregate_game_and_songs(game_name)
        if game:
            await game_collection.insert_one(game)
            game.pop("_id", None)
            return game
        else:
            return None

    except Exception as e:
        print(e)
        return {"msg": e}
