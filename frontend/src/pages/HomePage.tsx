import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import type { Game, Song } from '../types/content.ts'
const HomePage = () => {


  const [game, setGame] = useState<Game | null>(null)


  return (
    <main>
      <div>
        <SearchBar onGameFound={setGame} />
        {game && <GameCard gameData={game} />}
      </div>

    </main>)
}

export default HomePage;
