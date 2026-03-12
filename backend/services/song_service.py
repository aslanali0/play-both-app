from app.database import song_collection
from models.game import Track


async def add_songs_to_db(album, game):
    try:
        album_name = album.get("album_title")
        existing_album = await song_collection.find_one({"album_title": album_name})
        if existing_album:
            return {"msg": "Album and songs already exist in db"}
        songs = album.get("song_list")
        game_name = game.get("title")
        game_steam_id = str(game.get("steam_id"))
        to_db = []
        for song in songs:
            youtube_id = song.get("youtube_url")
            if not youtube_id:
                continue
            song_title = song.get("title")
            newSong = Track(
                game_title=game_name,
                game_steam_id=game_steam_id,
                title=song_title,
                album_title=album_name,
                youtube_url=youtube_id,
            )
            to_db.append(newSong.model_dump())

        if to_db:
            result = await song_collection.insert_many(to_db, ordered=False)
            return len(result.inserted_ids)
    except Exception as e:
        print(e)


async def get_songs(game_steam_id: str):
    try:
        cursor = song_collection.find({"game_steam_id": game_steam_id}, {"_id": 0})
        songs = await cursor.to_list()
        if songs:
            return songs
        else:
            return None
    except Exception as e:
        return e
