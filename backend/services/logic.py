from .song_service import add_songs_to_db
from .steam_service import search_game
from .scraper_service import get_albums
from .youtube_service import search_youtube


async def aggregate_game_and_songs(game_name: str):
    game = await search_game(game_name)
    albums = await get_albums(game_name)
    if albums and game:
        game["soundtrack"] = list()
        for album in albums:
            song_dict = {}
            songs_added = []
            songs = album.get('song_list', [])
            for song in songs:
                song_youtube_url = await search_youtube(game_name + " " + song)
                song_dict = {
                        "title": song,
                        "youtube_url": song_youtube_url 
                        }
                songs_added.append(song_dict)
            album_dict = {
                "album_title": album.get('album_title'),
                "song_list": songs_added
            }
            game["soundtrack"].append(album_dict)
            await add_songs_to_db(album_dict, game)
        return game
    else:
        return None
