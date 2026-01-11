from .steam_service import search_game
from .scraper_service import get_albums


async def aggregate_game_and_songs(game_name: str):
    game = await search_game(game_name)
    songs = await get_albums(game_name)
    if songs and game:
        game["soundtrack"] = songs
        return game
    else:
        return None
