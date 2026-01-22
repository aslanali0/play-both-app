import { useState } from 'react';
import type { Game, Song } from '../types/content.ts';
import axios from 'axios';

const GameCard = ({ gameData }: { gameData: Game | null }) => {

  const handleFavorite = async (song: Song) => {
    const response = await axios.post('http://localhost:8000/favorites/add',
      {

        game_steam_id: gameData?.steam_id.toString(),
        game_title: gameData?.title,
        song_title: song?.title,
        song_youtube_url: song?.youtube_url || "url_not_found"
      }, {
      params: {

        token: localStorage.getItem("token")
      }
    })
  }
  return (<div className='text-white relative group w-full max-w-6xl mx-auto mt-10'>

    <div className='w-full'>{gameData ? (
      <div className="home-element p-10 w-full mx-auto mt-12 transition-all "><h1 className="text-6xl font-black uppercase mb-10">{gameData.title}</h1>
        <img className="w-75 card m-4 rounded" src={gameData.image_url} />
        <ul className="w-full flex flex-col gap-6 p-4">
          {gameData.soundtrack.map((item: Song) => (
            <li className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/40 transition-all active:scale-95 w-full" key={item.youtube_url}>
              <div>
                {item.title}
                <button
                  onClick={async () => { await handleFavorite(item); }}
                  className="p-2 group/fav transition-transform active:scale-125"
                >
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
                </button>
              </div>

              <a target='_blank' href={`https://www.youtube.com/watch?v=${item.youtube_url}`}>
                <img className='w-70' src={`https://img.youtube.com/vi/${item.youtube_url}/hqdefault.jpg`} />
              </a>
            </li>
          ))}
        </ul></div>) :
      null
    }
    </div>

  </div >)
}

export default GameCard;
