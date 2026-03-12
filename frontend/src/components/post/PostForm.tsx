import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import Select from "react-select";
import type { Favorite } from "../../types/content";

const POSTS_API_URL = "/posts/create";
const FAVORITES_API_URL = "/favorites";
const PostForm = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedSongUrl, setSelectedSongUrl] = useState<string | null>(null);
  const [selectedSongTitle, setSelectedSongTitle] = useState<string | null>(
    null,
  );
  const songOptions = favorites.map((fav) => ({
    value: fav.song_youtube_url,
    label: fav.song_title,
  }));

  const customStyles = {
    menuList: (base: any) => ({
      ...base,
      maxHeight: "100px",
      overflowY: "auto",
    }),
    control: (base: any) => ({
      ...base,
      backgroundColor: "#1f2937",
      borderColor: "#374151",
      color: "white",
    }),
    singleValue: (base: any) => ({ ...base, color: "white" }),
    menu: (base: any) => ({ ...base, backgroundColor: "#1f2937" }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937",
      color: "white",
      cursor: "pointer",
    }),
    input: (base: any) => ({ ...base, color: "white" }),
  };
  const { profile } = useAuth();
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(POSTS_API_URL, {
        user: profile,
        song_url: selectedSongUrl,
        song_title: selectedSongTitle,
        content: content,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleFavorites = async () => {
      try {
        const response = await api.get(`${FAVORITES_API_URL}/my`, {
          params: {
            username: profile?.username,
          },
        });

        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleFavorites();
  }, [profile]);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col items-center mt-4 bg-gray-900/80 rounded-xl p-4 shadow-2xl border border-white/5"
    >
      <div className="w-full mb-4">
        <label className="block text-white mb-2 text-sm font-medium">
          Add a song from your favorites (Optional)
        </label>

        {favorites && (
          <Select
            options={songOptions}
            styles={customStyles}
            placeholder="Search for a song..."
            isClearable
            onChange={(selectedOption) => {
              setSelectedSongUrl(selectedOption ? selectedOption.value : null);
              setSelectedSongTitle(
                selectedOption ? selectedOption.label : null,
              );
            }}
            className="text-black"
          />
        )}
      </div>
      <div className="w-full flex items-center gap-2 bg-gray-800/50 p-1 rounded-lg border border-white/10 overflow-hidden">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 min-w-0 p-2 bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:text-base"
          placeholder="How you doing?"
        />
        <button
          type="submit"
          className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-md cursor-pointer transition-all active:scale-95 text-sm sm:text-base"
        >
          Post
        </button>
      </div>{" "}
    </form>
  );
};
export default PostForm;
