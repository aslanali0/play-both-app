from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import favorites_routes, game_routes, profile_routes, user_routes

import logging

# Log formatını dosya ve satır numarasını gösterecek şekilde güncelle
logging.basicConfig(
    level=logging.INFO, format="%(levelname)s: %(pathname)s:%(lineno)d - %(message)s"
)
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Hangi sitelerin erişebileceğini belirler
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE hepsine izin verir
    allow_headers=["*"],  # Authorization gibi tüm headerlara izin verir
)
app.include_router(game_routes.router, prefix="/games", tags=["games"])
app.include_router(user_routes.router, prefix="/users", tags=["users"])
app.include_router(profile_routes.router, prefix="/profile", tags=["profiles"])
app.include_router(favorites_routes.router, prefix="/favorites", tags=["favorites"])
