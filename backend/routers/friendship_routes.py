from fastapi import APIRouter
from models.friendship import Friendship, FriendshipResponse
from services.friend_services import (
    get_friends_profiles,
    get_friends_usernames,
    get_friendship_requests,
    get_friendship_status,
    respond_friend_request,
    send_friend_request,
)

router = APIRouter()


@router.post("/add")
async def create_friendship(friendship: Friendship):
    return await send_friend_request(friendship)


@router.post("/respond")
async def respond_friendship(friendship_response: FriendshipResponse):
    return await respond_friend_request(friendship_response)


@router.get("/status")
async def friendship_status(sender: str, receiver: str):
    return await get_friendship_status(sender, receiver)


@router.get("/requests")
async def friendship_requests(receiver: str):
    return await get_friendship_requests(receiver)


@router.get("/friends")
async def friends(username: str):
    return await get_friends_usernames(username)


@router.get("/friends/profiles")
async def friends_profiles(username: str):
    return await get_friends_profiles(username)
