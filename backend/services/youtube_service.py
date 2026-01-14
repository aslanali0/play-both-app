from dotenv import load_dotenv
import httpx
import os

load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search"


async def search_youtube(song_name):
    client = httpx.AsyncClient()
    print("api key: " + str(YOUTUBE_API_KEY))
    response = await client.get(
        YOUTUBE_URL,
        params={
            "q": song_name,
            "key": str(YOUTUBE_API_KEY),
            "part": "snippet",
            "maxResults": 1,
            "type": "video",
        },
    )
    data = response.json()
    if data and data["items"]:
        print(data)
        return data["items"][0]["id"]["videoId"]
    else:
        return None
