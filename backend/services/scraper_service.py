import httpx
import bs4

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://vgmdb.net/",
}

TIMEOUT = httpx.Timeout(20.0)


async def get_albums(game_name: str):
    albums = []

    async with httpx.AsyncClient(
        headers=HEADERS, follow_redirects=True, timeout=TIMEOUT
    ) as client:
        # 1) Search
        resp = await client.get("https://vgmdb.net/search", params={"q": game_name})
        if resp.status_code == 403:
            # burada açıkça gör: VGMdb bizi blokluyor
            raise httpx.HTTPStatusError(
                "VGMdb returned 403 Forbidden", request=resp.request, response=resp
            )
        resp.raise_for_status()

        soup = bs4.BeautifulSoup(resp.text, "html.parser")
        results = soup.find(class_="results")

        # 2) Eğer direkt albüm sayfasına düştüyse
        if not results:
            album_name = soup.find(class_="albumtitle")
            track_rows = soup.find_all("tr", class_="rolebit")
            if not (album_name and track_rows):
                return None

            songs = []
            for row in track_rows:
                tds = row.find_all("td")
                if len(tds) < 2:
                    continue
                songs.append(tds[1].get_text(strip=True))

            albums.append(
                {"album_title": album_name.get_text(strip=True), "song_list": songs}
            )
            return albums

        # 3) Search sonuçlarından albümleri gez
        all_albums = results.find_all(class_="albumtitle")
        for album in all_albums:
            link = album.get("href")
            if not link:
                continue

            if link.startswith("http://"):
                link = link.replace("http://", "https://")

            # link relative ise absolute yap
            if link.startswith("/"):
                link = f"https://vgmdb.net{link}"

            album_resp = await client.get(link)
            if album_resp.status_code == 403:
                raise httpx.HTTPStatusError(
                    "VGMdb returned 403 Forbidden (album page)",
                    request=album_resp.request,
                    response=album_resp,
                )
            album_resp.raise_for_status()

            album_soup = bs4.BeautifulSoup(album_resp.text, "html.parser")
            track_rows = album_soup.find_all("tr", class_="rolebit")

            songs = []
            for row in track_rows:
                tds = row.find_all("td")
                if len(tds) < 2:
                    continue
                songs.append(tds[1].get_text(strip=True))

            albums.append(
                {"album_title": album.get_text(strip=True), "song_list": songs}
            )

    return albums

