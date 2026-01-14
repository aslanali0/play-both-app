from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import game_routes, user_routes


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
