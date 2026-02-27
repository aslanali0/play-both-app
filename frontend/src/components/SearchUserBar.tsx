import axios from "axios";
import { useState } from "react";
import type { Game } from "../types/content";
import api from "../api/api";
import type { UserProfile } from "../types/user";

const API_URL = "/profile";

const SearchUserBar = ({ onSearched }) => {
  const [search, setSearch] = useState("");

  const handleSearchUser = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      console.log(search);
      const response = await api.get(`${API_URL}/user`, {
        params: {
          username: search,
        },
      });
      const userData = response.data;
      onSearched(userData);
      setSearch("");
    } catch (error) {
      console.log("search error: " + error);
    }
  };

  return (
    <form
      className="text-white flex relative w-full max-w-xl mx-auto mt-8"
      onSubmit={handleSearchUser}
    >
      <input
        className="bg-gray-900 rounded-l w-full text-lg text-white px-4 py-3 focus:outline-none focus:ring-0 placeholder-gray-500"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a user..."
      />
      <input
        type="submit"
        className="rounded-r p-4 text-stone-50/70 cursor-pointer bg-orange-950/90 transition hover:bg-orange-700 hover:text-white"
        value="Search"
      />
    </form>
  );
};

export default SearchUserBar;
