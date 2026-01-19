import type { Game, Song } from '../types/content.ts';

const GameCard = ({ gameData }: { gameData: Game | null }) => {

  console.log(gameData)
  return (<div className='text-white relative group w-full max-w-6xl mx-auto mt-10'>

    <div className='w-full'>{gameData ? (
      <div className="home-element p-10 w-full mx-auto mt-12 transition-all "><h1 className="text-6xl font-black uppercase mb-10">{gameData.title}</h1>
        <img className="w-75 card m-4 rounded" src={gameData.image_url} />
        <ul className="w-full flex flex-col gap-6 p-4">
          {gameData.soundtrack.map((item: Song) => (
            <li className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/40 transition-all active:scale-95 w-full" key={item.youtube_url}>

              {item.title}
              <iframe src={`https://www.youtube.com/embed/${item.youtube_url}`}>
              </iframe>
            </li>
          ))}
        </ul></div>) :
      null
    }
    </div>

  </div >)
}

export default GameCard;
