import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import type { Game, Song } from '../types/content.ts'
const HomePage = () => {


  const username = localStorage.getItem('username');
  const [game, setGame] = useState<Game | null>(null)
  const [search, setSearch] = useState('');


  return (
    <main>
      <div>
        <SearchBar onGameFound={setGame} />
        {game && <GameCard gameData={game} />}
      </div>

    </main>)
}

export default HomePage;
