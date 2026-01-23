import axios from "axios";
import { useEffect, useState } from "react";
import type { Favorite } from "../../types/content";


const Favorites = () => {

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

const handleFavorites = async () => {

      try {
        const response = await axios.get("http://localhost:8000/favorites/my", {
          params: {
            token: localStorage.getItem("token")
          }
        })

        setFavorites(response.data)
        setLoading(false)
      }
      catch (error) {
        console.log(error)
      }

    }
  const handleRemoveFavorite = async (fav: Favorite) => {

    try {
      await axios.post("http://localhost:8000/favorites/remove", 
      {
        game_steam_id: fav.game_steam_id,
        game_title: fav.game_title,
        song_title: fav.song_title,
        song_youtube_url: fav.song_youtube_url
      },
      {
        params: {
          token: localStorage.getItem("token")
        }
      })}
      catch (error) {
        console.log("Remove favorite error: " + error)
      }
      // Refresh favorites list after removal
      handleFavorites()
    }
  

  useEffect(() => {
    
    handleFavorites()
  }, [])
  return (
    <div className="rounded-b-2xl home-element flex flex-col border-l-4 border-indigo-500 bg-gray-900/60">
      <span className="items-center text-center font-bold text-indigo-500">
        Favorites
      </span>
      {!loading ? (favorites ? (
        favorites.map((fav: Favorite) => (
          <div
            key={fav.song_youtube_url} 
            className="flex items-center justify-between p-4 hover:border-neon-cyan transition-all duration-300"
          >
            <div className="flex flex-col overflow-hidden">
              <a href={`https://www.youtube.com/watch?v=${fav.song_youtube_url}`} target="_blank" className="text-white font-bold truncate hover:text-indigo-300 transition-colors">
                {fav.song_title}
              </a>
              <span className="text-gray-400 text-[10px] uppercase tracking-tighter font-mono italic">
                {fav.game_title}
              </span>
              <input className="text-gray-400 text-[10px] uppercase tracking-tighter font-mono italic" type="button" value={"Remove"} onClick={async () => {await handleRemoveFavorite(fav)}} />
            </div>
          </div>
        ))) : <span className="text-center p-4">No favorites yet...</span>
      ) : (
        <div>Loading...</div>
      )}
    </div >
  );
}

export default Favorites;
