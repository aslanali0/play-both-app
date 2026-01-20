import httpx


async def search_game(game_name: str):
    async with httpx.AsyncClient() as client:
        search_url = f"https://store.steampowered.com/api/storesearch/?term={game_name}&l=english&cc=US"
        response = await client.get(search_url)
    data = response.json()
    items = data.get("items", [])

    if items:
        game = items[0]  # includes all attributes even the ones we won't need
        game_dict = {  # we fetch only these 3
            "steam_id": game.get("id"),
            "title": game.get("name"),
            "image_url": game.get("tiny_image"),
        }
        print(game_dict)
        return game_dict
    else:
        print(f"No match for {game_name}")
        return None
