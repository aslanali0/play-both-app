from datetime import datetime
from app.database import friendship_collection
from models.friendship import Friendship, FriendshipResponse, FriendshipStatus


async def send_friend_request(new_friendship: Friendship):
    try:
        friendship_dict = new_friendship.model_dump()
        friendship_dict["created_at"] = datetime.now()
        print(friendship_dict)
        print(type(friendship_dict))
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
        friendship = await friendship_collection.find_one({
            "request_sender": sender,
            "request_receiver": receiver,
        })
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
        requests = await response.to_list()
        return requests
    except Exception as e:
        return e
