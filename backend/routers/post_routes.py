from fastapi import APIRouter

from models.post import Comment, Likes, PostIn, PostOut
from services.post_services import (
    comment_post,
    create_post,
    get_all_posts,
    get_comments_for_post,
    get_users_all_posts,
    increment_dislike_post,
    like_unlike_post,
)


router = APIRouter()


@router.post("/create")
async def submit_post(post: PostIn):
    return await create_post(post)


@router.get("/all")
async def get_posts():
    return await get_all_posts()


@router.post("/like")
async def like_post(like: Likes):
    return await like_unlike_post(post_id=like.post_id, username=like.username)


@router.post("/dislike")
async def dislike_post(post: PostOut):
    return await increment_dislike_post(post_id=post.id)


@router.get("/user")
async def get_users_posts(username: str):
    return await get_users_all_posts(username=username)


@router.post("/comment")
async def submit_comment(comment: Comment):
    return await comment_post(comment=comment)


@router.get("/comments")
async def get_comments(post_id: str):
    return await get_comments_for_post(post_id=post_id)
