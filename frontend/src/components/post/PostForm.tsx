import { useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const API_URL = "/posts/create";
const PostForm = () => {
  const { profile } = useAuth();
  const [content, setContent] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = api.post(API_URL, {
        user: profile,
        content: content,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full items-center max-w-md mx-auto gap-2 flex mt-4 p-2 bg-gray-900/80 rounded"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border-gray-300/10 text-white"
        placeholder="How you doing?"
      />
      <button
        type="submit"
        className="transition-all w-20 cursor-pointer bg-blue-500 h-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Post
      </button>
    </form>
  );
};
export default PostForm;
