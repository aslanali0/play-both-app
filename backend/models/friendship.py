from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel


class Friendship(BaseModel):
    request_sender: str
    request_receiver: str
    status: str
    created_at: Optional[datetime] = None


class FriendshipStatus(Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    IGNORED = "ignored"
    BLOCKED = "blocked"


class FriendshipResponse(BaseModel):
    request_sender: str
    request_receiver: str
    response: FriendshipStatus
