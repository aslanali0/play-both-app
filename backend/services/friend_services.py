from datetime import datetime
from app.database import friendship_collection
from models.friendship import Friendship, FriendshipResponse, FriendshipStatus
from services.profile_services import get_profile_service


async def send_friend_request(new_friendship: Friendship):
    try:
        friendship_dict = new_friendship.model_dump()
        friendship_dict["created_at"] = datetime.now()
        await friendship_collection.insert_one(friendship_dict)
        friendship_dict.pop("_id")
        return friendship_dict
    except Exception as e:
        return e


async def respond_friend_request(friendship_response: FriendshipResponse):
    try:
        updated_data = {"$set": {"status": friendship_response.response.value}}
        result = await friendship_collection.update_one(
            {
                "request_sender": friendship_response.request_sender,
                "request_receiver": friendship_response.request_receiver,
            },
            updated_data,
        )
        return updated_data if result.matched_count > 0 else "Request not found"
    except Exception as e:
        return e


async def get_friendship_status(sender: str, receiver: str):
    try:
        friendship = await friendship_collection.find_one(
            {
                "request_sender": sender,
                "request_receiver": receiver,
            }
        )
        if friendship is None:
            # Checking again if friendship exists in the opposite direction
            friendship = await friendship_collection.find_one(
                {
                    "request_sender": receiver,
                    "request_receiver": sender,
                }
            )
            if friendship is None:
                return None
        return friendship.get("status")
    except Exception as e:
        return e


async def get_friendship_requests(receiver: str):
    try:
        response = friendship_collection.find(
            {
                "request_receiver": receiver,
                "status": FriendshipStatus.PENDING.value,
            },
            {"_id": 0},
        )
        requests = await response.to_list(length=100)
        print(requests)
        return requests
    except Exception as e:
        return e


async def get_friends_usernames(username: str):
    try:
        query = {
            "$and": [
                {"$or": [{"request_sender": username}, {"request_receiver": username}]},
                {"status": "accepted"},
            ]
        }
        response = friendship_collection.find(query, {"_id": 0})
        friendships = await response.to_list(length=200)
        friends_usernames = []
        for friendship in friendships:
            if friendship["request_sender"] == username:
                friends_usernames.append(friendship["request_receiver"])
            else:
                friends_usernames.append(friendship["request_sender"])
        return friends_usernames
    except Exception as e:
        return e


async def get_friends_profiles(username: str):
    try:
        friends_usernames = await get_friends_usernames(username)
        friends_profiles = []
        for friend_username in friends_usernames:
            profile = await get_profile_service(friend_username)
            if profile:
                friends_profiles.append(profile)
        return friends_profiles
    except Exception as e:
        return e
