from fastapi import APIRouter, Depends
from models.user import UserOut, UserCreate, UserLogin, Token
from utils.auth_utils import create_access_token
from services.user_service import create_user, auth_user
from app.dependencies import get_current_user

router = APIRouter()


@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    new_user = await create_user(user)
    return new_user


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    logged_in_user = await auth_user(email=user.email, password=user.password)
    if logged_in_user is not None:
        encoded_jwt = create_access_token(data={"sub": str(logged_in_user["email"])})
        return {"access_token": encoded_jwt, "token_type": "bearer"}
    else:
        return {"msg": "Failed to auth"}


@router.get("/test")
async def testing(current_user: dict = Depends(get_current_user)):
    return {
        "msg": f"Welcome {current_user.get('email')}",
        "password": f"{current_user.get('password')}",
    }
