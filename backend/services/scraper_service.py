import httpx
import bs4
import asyncio  # Aynı şekilde bu da silinecek


async def get_albums(game_name: str):
    songs = []
    async with httpx.AsyncClient() as client:
        search_url = f"https://vgmdb.net/search?q={game_name}"
        response = await client.get(search_url, follow_redirects=True)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    results = soup.find(class_="results")
    if results:
        first_find = results.find(class_="albumtitle")
    else:
        track_rows = soup.find_all("tr", class_="rolebit")
        if track_rows:
            for row in track_rows:
                tds = row.find_all("td")
                song_name = tds[1].get_text(strip=True)
                songs.append(song_name)
            return songs
        else:
            return None
    first_link = first_find.get("href")
    async with httpx.AsyncClient() as client:
        album_search_url = first_link
        album_response = await client.get(album_search_url, follow_redirects=True)
    album_soup = bs4.BeautifulSoup(album_response.text, "html.parser")
    track_rows = album_soup.find_all("tr", class_="rolebit")
    for row in track_rows:
        tds = row.find_all("td")
        song_name = tds[1].get_text(strip=True)
        songs.append(song_name)
    return songs


# Bunları silmeyin unutmamalıyım
if __name__ == "__main__":
    asyncio.run(get_albums("Black Desert"))
