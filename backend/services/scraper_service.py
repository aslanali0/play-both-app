import httpx
import bs4

from models.game import Album, Track


async def get_albums(game_name: str):
    headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
    albums = []
    songs = []
    async with httpx.AsyncClient(headers=headers) as client:
        search_url = f"https://vgmdb.net/search?q={game_name}"
        response = await client.get(search_url, follow_redirects=True)
    soup = bs4.BeautifulSoup(response.text, "html.parser")
    results = soup.find(class_="results")
    if not results:
        album_name = soup.find(class_="albumtitle")
        track_rows = soup.find_all("tr", class_="rolebit")
        if track_rows:
            for row in track_rows:
                tds = row.find_all("td")
                song_name = tds[1].get_text(strip=True)
                songs.append(song_name)
                
            albums.append({"album_title":album_name.get_text(strip=True),"song_list":songs})
            return albums
        else:
            return None
    else:
        try:
            all_albums = results.find_all(class_="albumtitle")
            for album in all_albums:
                songs = []
                link = album.get("href")
                if not link:
                    continue
                if link.startswith("http"):
                    link = link.replace("http://", "https://")
                async with httpx.AsyncClient(headers=headers) as client:
                    album_response = await client.get(link, follow_redirects=True)
                album_soup = bs4.BeautifulSoup(album_response.text, "html.parser")
                track_rows = album_soup.find_all("tr", class_="rolebit")
                for row in track_rows:
                    tds = row.find_all("td")
                    song_name = tds[1].get_text(strip=True)
                    songs.append(song_name)
                albums.append({"album_title": album.get_text(strip=True),"song_list": songs})
        except Exception as e:
            print(e)
        return albums
