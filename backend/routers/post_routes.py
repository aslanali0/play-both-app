from fastapi import APIRouter

from models.post import Post, UserProfile
from services.post_services import create_post, get_all_posts, increment_like_post


router = APIRouter()


@router.post("/create")
async def submit_post(post: Post):
    return await create_post(post)


@router.get("/all")
async def get_posts():
    return await get_all_posts()


@router.post("/like")
async def like_post(post: Post):
    return await increment_like_post(post_id=post.id)
