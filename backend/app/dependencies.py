from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyHeader
from fastapi.security.http import HTTP_401_UNAUTHORIZED
from .auth_utils import decode_access_token
from .database import user_collection

oauth2_scheme = APIKeyHeader(name="Authorization", auto_error=False)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    print(token)
    try:
        decoded_email = decode_access_token(token)
        print(decoded_email)
        current_user = await user_collection.find_one({"email": decoded_email})
    except Exception as e:
        print("exception")
        raise HTTPException(HTTP_401_UNAUTHORIZED)

    if current_user == None:
        print("user not found")
        raise HTTPException(HTTP_401_UNAUTHORIZED)
    current_user.pop("password", None)
    return current_user
