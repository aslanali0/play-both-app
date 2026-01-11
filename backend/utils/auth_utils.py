from passlib.context import CryptContext
import os
from jose import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
load_dotenv()
TOKEN_EXPIRE = 30


def create_access_token(data: dict):
    temp = data.copy()
    now = datetime.now(timezone.utc)
    expires = now + timedelta(minutes=30)
    temp["exp"] = expires
    encoded = jwt.encode(
        temp, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return encoded


def decode_access_token(token: str):
    decoded = jwt.decode(
        token=token, key=os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")]
    )
    return decoded.get("sub")


def hash_pwd(password: str):
    return pwd_context.hash(password)


def verify_pwd(plain_pwd, hashed_pwd):
    return pwd_context.verify(plain_pwd, hashed_pwd)
