import { useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import type { Post } from "../../types/post";

const API_URL = "/posts/comment";
const CommentForm = ({ post }: { post: Post }) => {
  const [commentState, setCommentState] = useState(false);
  const { profile } = useAuth();
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(API_URL, {
        post_id: post.post_id,
        user: profile,
        content: content,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <ChatBubbleLeftIcon
        onClick={() => setCommentState(!commentState)}
        className="cursor-pointer w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors p-0.5"
      />

      {commentState && (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="animate-slide-down w-full max-w-md flex items-stretch gap-2 mt-3 bg-gray-900/90 p-1.5 rounded-lg border border-white/5 shadow-xl"
        >
          <input
            type="text"
            value={content}
            autoFocus
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-w-0 p-2 rounded bg-gray-800 border border-white/10 text-white placeholder-gray-500 text-base focus:border-blue-500 outline-none transition-all"
            placeholder="Leave a comment..."
          />

          <button
            type="submit"
            className="shrink-0 cursor-pointer bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-bold px-4 rounded transition-all"
          >
            Comment
          </button>
        </form>
      )}
    </div>
  );
};
export default CommentForm;
