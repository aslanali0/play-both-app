from motor import motor_asyncio
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("DB_URL")
client = motor_asyncio.AsyncIOMotorClient(MONGO_URL)

db = client.playboth_db
user_collection = db.get_collection("users")
comment_collection = db.get_collection("comments")
song_collection = db.get_collection("songs")
game_collection = db.get_collection("games")
