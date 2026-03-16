import { useState } from "react";
import api from "../api/api";
import type { Game } from "../types/content";

const API_URL = "/games";
type Props = {
  onGameFound: (game: Game) => void | Promise<void>;
};

const SearchBar = ({ onGameFound }: Props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(search);
      const response = await api.get(`${API_URL}/search`, {
        params: {
          game_name: search,
        },
      });
      const game_data = response.data;
      onGameFound(game_data);
    } catch (error) {
      console.log("search error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <form
        className="text-white flex relative w-full max-w-xl mx-auto mt-8"
        onSubmit={handleSearch}
      >
        <input
          className="bg-gray-900 rounded-l w-full  text-lg text-white px-4 py-3 focus:outline-none focus:ring-0 placeholder-gray-500"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a game..."
        />
        <input
          type="submit"
          className="rounded-r p-4 text-stone-50/70 cursor-pointer bg-orange-950/90 transition hover:bg-orange-700 hover:text-white"
          value="Search"
        />
      </form>
      {loading && (
        <span className=" mt-10 text-center justify-center">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500"></div>
          </div>
        </span>
      )}
    </div>
  );
};

export default SearchBar;
