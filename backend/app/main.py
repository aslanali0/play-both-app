from fastapi import FastAPI, Depends
from fastapi.security import APIKeyHeader

from services.game_service import get_game_and_songs
from .auth_utils import create_access_token

from models.user import UserCreate, UserLogin, UserOut, Token
from models.game import Game, Track
from services.user_service import create_user, auth_user
from .dependencies import get_current_user, oauth2_scheme

app = FastAPI()


@app.get("/home")
def test():
    return "Hello everynyan"


@app.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    new_user = await create_user(user)
    return new_user


@app.post("/login", response_model=Token)
async def login(user: UserLogin):
    logged_in_user = await auth_user(email=user.email, password=user.password)
    if logged_in_user is not None:
        encoded_jwt = create_access_token(data={"sub": str(logged_in_user["email"])})
        return {"access_token": encoded_jwt, "token_type": "bearer"}
    else:
        return {"msg": "Failed to auth"}


@app.get("/test")
async def testing(current_user: dict = Depends(get_current_user)):
    return {
        "msg": f"Welcome {current_user.get('email')}",
        "password": f"{current_user.get('password')}",
    }


@app.post("/search")
async def search_game_info(game_name: str, response_model=Game):
    game = await get_game_and_songs(game_name)
    if game:
        return game
    else:
        return {"msg": "Game not found. Please type the exact name"}
