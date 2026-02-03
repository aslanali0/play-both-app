from fastapi import HTTPException
from app.database import user_collection
from models.user import UserCreate, UserLogin
from utils.auth_utils import hash_pwd, verify_pwd


async def create_user(user: UserCreate):
    existing_user = await user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Please choose a different username")
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email address already in use")
    user_dict = user.model_dump()
    plain_pwd = user_dict.get("password")
    hashed_pwd = hash_pwd(plain_pwd)
    user_dict["password"] = hashed_pwd
    await user_collection.insert_one(user_dict)
    return user_dict


async def auth_user(email: str, password: str):
    existing_user = await user_collection.find_one({"email": email})
    if existing_user == None:
        raise HTTPException(status_code=400, detail="User not found")
    hashed_pwd = existing_user.get("password")
    if verify_pwd(password, hashed_pwd):
        logged_user = {"username": existing_user.get('username'), "email": email, "password": password}
        return logged_user
    else:
        return None
