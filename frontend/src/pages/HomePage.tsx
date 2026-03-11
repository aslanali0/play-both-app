import { useState } from "react";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import type { Game } from "../types/content.ts";
const HomePage = () => {
  const [game, setGame] = useState<Game | null>(null);

  return (
    <main>
      <div className="flex items-center flex-col w-full">
        <SearchBar onGameFound={setGame} />
        {game && <GameCard key={game.steam_id} gameData={game} />}
      </div>
    </main>
  );
};

export default HomePage;
