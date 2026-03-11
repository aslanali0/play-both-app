import { useEffect, useState } from "react";
import type { Song } from "../types/content";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Favorite } from "../types/content";

// To determine if song is already added favorites or not
const API_URL = "/favorites";

const SongCard = ({
  songData,
  favList,
}: {
  songData: Song | null;
  favList: any;
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (favList) {
      const found = favList.some(
        (f: Favorite) => f.song_youtube_url == songData?.youtube_url,
      );
      setIsFavorited(found);
    }
  }, [favList, songData]);

  const handleFavorite = async () => {
    if (songData == null) return;
    if (songData.game_steam_id == null) return;
    if (!isFavorited) {
      const response = await api.post(
        `${API_URL}/add`,
        {
          game_steam_id: songData.game_steam_id.toString(),
          game_title: songData.game_title,
          song_title: songData.title,
          song_youtube_url: songData.youtube_url || "url_not_found",
        },
        {
          params: {
            username: user?.user?.username,
          },
        },
      );
      setIsFavorited(true);
      return response.data;
    } else {
      const response = await api.post(`${API_URL}/remove`, {
        game_steam_id: songData.game_steam_id.toString(),
        game_title: songData.game_title,
        song_title: songData.title,
        song_youtube_url: songData.youtube_url || "url_not_found",
      });
      setIsFavorited(false);
      return response.data;
    }
  };

  return (
    <li className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/40 transition-all active:scale-95 w-full">
      <div className="flex col">
        <div>
          <h2>{songData?.title}</h2>

          <span className="text-gray-400 text-[10px] uppercase tracking-tighter font-mono italic">
            {songData?.album_title}
          </span>
        </div>
        <button
          onClick={handleFavorite}
          className="p-2 group/fav transition-transform active:scale-125"
        >
          {isFavorited ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-6 h-6 text-black-400 fill-red-500 transition-colors group-hover/fav:text-red-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-zinc-400 transition-colors group-hover/fav:text-red-500 group-hover/fav:fill-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </button>
      </div>

      <a
        target="_blank"
        href={`https://www.youtube.com/watch?v=${songData?.youtube_url}`}
      >
        <img
          className="w-70"
          src={`https://img.youtube.com/vi/${songData?.youtube_url}/hqdefault.jpg`}
        />
      </a>
    </li>
  );
};

export default SongCard;
