from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    auth_routes,
    favorites_routes,
    friendship_routes,
    game_routes,
    profile_routes,
    user_routes,
    song_routes,
    post_routes,
)

import logging

logging.basicConfig(
    level=logging.INFO, format="%(levelname)s: %(pathname)s:%(lineno)d - %(message)s"
)
app = FastAPI()

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(game_routes.router, prefix="/games", tags=["games"])
app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(profile_routes.router, prefix="/profile", tags=["profiles"])
app.include_router(favorites_routes.router, prefix="/favorites", tags=["favorites"])
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
app.include_router(song_routes.router, prefix="/songs", tags=["songs"])
app.include_router(friendship_routes.router, prefix="/friendship", tags=["friendships"])
app.include_router(post_routes.router, prefix="/posts", tags=["posts"])
logging.info("CORS_ORIGINS=%s", cors_origins)
logging.info("Parsed origins=%s", origins)
