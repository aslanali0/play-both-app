import { useEffect, useState } from 'react';
import type { Game, Song, Album } from '../types/content.ts';
import api from '../api/api.ts';
import SongCard from './SongCard.tsx'
const FAVORITE_API_URL = '/favorites'
const SONG_API_URL = '/songs'
const GameCard = ({ gameData }: { gameData: Game | null }) => {

  const [favList, setFavList] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<Song[] | null>(null);
  const [pageCounter, setPageCounter] = useState(0)

  const handleNextBackPage = (num: number) => {
    setPageCounter(pageCounter+num); 
    window.scrollTo({top:0})
  }
  const formatData = (rawData : Song[] | null) => {
    return rawData?.map(item => ({
      ...item,
      game_steam_id: gameData?.steam_id,
      game_title: gameData?.title
    }))
  }
  useEffect(() => {
    const handleAlreadyFavorited = async () => {
      try {
        const response = await api.get(`${FAVORITE_API_URL}/my`)
        setFavList(response.data)
      }
      catch(error){
        console.log(error);
      }
    }
    const handleSongs = async() => {
      try {
        const response = await api.get(`${SONG_API_URL}/search`,{
          params:
          {
            game_steam_id: gameData?.steam_id
          }
        })
        setProcessedData(formatData(response.data));
      }
      catch(error){
      console.log(error);
      }
    }
    handleSongs();

    handleAlreadyFavorited();
  }, [gameData]);
    
  return (<div className='text-white relative group w-full max-w-6xl mx-auto mt-10'>

    <div className='w-full'>{gameData ? (
      <div className="home-element p-10 w-full mx-auto mt-12 transition-all "><h1 className="text-6xl font-black uppercase mb-10">{gameData.title}</h1>
        <img className="w-75 card m-4 rounded" src={gameData.image_url || ""} />
        <ul className="w-full flex flex-col gap-6 p-4">
          {processedData?.slice(pageCounter*10,(pageCounter+1)*10).map((item) => ( item ? (
          <SongCard key={item.youtube_url || `https://www.youtube.com/results?search_query=${item.title}`} songData={item} favList={favList}/>
          ):null))}
        </ul>
        <div className='text-center'>
          {processedData?.slice((pageCounter-1)*10,(pageCounter)*10).length > 0 &&
          <button className='underline text-blue-400 cursor-pointer mr-10'  onClick={() => handleNextBackPage(-1)}> &lt; Previous Page </button>}

          {processedData?.slice((pageCounter+1)*10,(pageCounter+2)*10).length > 0 &&
          <button className='underline text-blue-400 cursor-pointer' onClick={() => handleNextBackPage(+1)}> Next Page &gt; </button>}
        
          
        </div>

      </div>) :
    null
    }
    </div>
  
  </div >)
}

export default GameCard;
