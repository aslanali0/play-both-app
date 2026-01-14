from .steam_service import search_game
from .scraper_service import get_albums
from .youtube_service import search_youtube


async def aggregate_game_and_songs(game_name: str):
    game = await search_game(game_name)
    songs = await get_albums(game_name)
    if songs and game:
        game["soundtrack"] = list()
        for song in songs:
            song_dict = {
                "title": song,
                "youtube_url": await search_youtube(game_name + song),
            }
            game["soundtrack"].append(song_dict)
        return game
    else:
        return None
