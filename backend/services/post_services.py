from datetime import datetime

from bson import ObjectId
from models.post import Post
from app.database import post_collection


async def create_post(post: Post):
    post.created_at = datetime.now().isoformat()

    # Ensure created_at is set to current time
    post_dict = post.model_dump()
    await post_collection.insert_one(post_dict)
    post_dict.pop("_id", None)
    return post_dict


async def get_all_posts():
    posts = []
    try:
        posts_cursor = post_collection.find()
        posts = await posts_cursor.to_list(length=100)  # Limited for testing
        for post in posts:
            post["_id"] = str(post["_id"])  # Convert ObjectId to string
    except Exception as e:
        return {"error": str(e)}
    posts.sort(
        key=lambda x: x.get("created_at", ""), reverse=True
    )  # Sort by created_at
    return posts


async def increment_like_post(post_id: str):
    print(f"Incrementing like for post ID: {post_id}")
    try:
        object_id = ObjectId(post_id)
        post = await post_collection.find_one_and_update(
            {"_id": object_id}, {"$inc": {"likes": 1}}, return_document=True
        )
        post.pop("_id", None)
        return post
    except Exception as e:
        print(f"Error liking post: {e}")
