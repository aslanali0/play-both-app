from datetime import datetime

from bson import ObjectId
from models.post import Comment, PostIn, PostOut
from app.database import post_collection, like_collection, comment_collection


async def create_post(post: PostIn):
    post.created_at = datetime.now().isoformat()
    # Ensure created_at is set to current time
    post_dict = post.model_dump()
    await post_collection.insert_one(post_dict)
    post_dict.pop("_id", None)
    return post_dict


async def get_all_posts():
    posts = [PostOut]
    try:
        posts_cursor = post_collection.find()
        posts = await posts_cursor.to_list(length=100)  # Limited for testing
        for post in posts:
            post["post_id"] = str(post.pop("_id"))

    except Exception as e:
        return {"error": str(e)}
    posts.sort(
        key=lambda x: x.get("created_at", ""), reverse=True
    )  # Sort by created_at
    return posts


async def count_likes(post_id: str):
    try:
        likes_count = await like_collection.count_documents({"post_id": post_id})
        return likes_count
    except Exception as e:
        print(f"Error counting likes: {e}")


async def like_unlike_post(post_id: str, username: str):
    existing_like = await like_collection.find_one(
        {"post_id": post_id, "username": username}
    )
    if existing_like:
        deleted = await like_collection.delete_one(
            {"post_id": post_id, "username": username}
        )
        return {"response": deleted.acknowledged, "data": -1}
    try:
        like = {"post_id": post_id, "username": username}
        response = await like_collection.insert_one(like)
        like.pop("_id", None)
        return {"response": response.acknowledged, "data": 1}
    except Exception as e:
        print(f"Error liking post: {e}")


async def increment_dislike_post(post_id: str):
    try:
        object_id = ObjectId(post_id)
        post = await post_collection.find_one_and_update(
            {"_id": object_id}, {"$inc": {"dislikes": 1}}, return_document=True
        )
        post.pop("_id", None)
        return post
    except Exception as e:
        print(f"Error disliking post: {e}")


async def get_users_all_posts(username: str):
    posts = [PostOut]
    try:
        posts_cursor = post_collection.find({"user.username": username})
        posts = await posts_cursor.to_list(length=100)
        for post in posts:
            post["post_id"] = str(post.pop("_id"))
        posts.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return posts
    except Exception as e:
        return {"error": str(e)}


async def comment_post(comment: Comment):
    comment.created_at = datetime.now().isoformat()
    comment_dict = comment.model_dump()
    await comment_collection.insert_one(comment_dict)
    comment_dict.pop("_id", None)
    return comment_dict


async def get_comments_for_post(post_id: str):
    comments = []
    try:
        comments_cursor = comment_collection.find({"post_id": post_id})
        comments = await comments_cursor.to_list(length=100)
        if not comments:
            return None
        for comment in comments:
            comment["_id"] = str(comment["_id"])
        comments.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return comments
    except Exception as e:
        return {"error": str(e)}
