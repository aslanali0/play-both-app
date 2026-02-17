from motor import motor_asyncio
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("DB_URL")
client = motor_asyncio.AsyncIOMotorClient(MONGO_URL)

db = client.playboth_db
user_collection = db.get_collection("users")
comment_collection = db.get_collection("comments")
favorite_collection = db.get_collection("favorites")
game_collection = db.get_collection("games")
song_collection = db.get_collection("songs")
profile_collection = db.get_collection("profiles")
friendship_collection = db.get_collection("friendship")
