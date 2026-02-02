
from routers.game_routes import APIRouter
from services.song_service import get_songs


router = APIRouter()

@router.get('/search')
async def search_songs(game_steam_id: str):
    return await get_songs(game_steam_id)
