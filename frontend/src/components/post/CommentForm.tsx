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
  const handleSubmit = () => {
    try {
      const response = api.post(API_URL, {
        post_id: post.post_id,
        user: profile,
        content: content,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ChatBubbleLeftIcon
        onClick={() => {
          setCommentState(!commentState);
        }}
        className="cursor-pointer w-5 flex"
      />
      {commentState && (
        <form
          onSubmit={handleSubmit}
          className="animate-slide-down w-sm items-center max-w-md mx-auto gap-2 flex mt-4 bg-gray-900/80 rounded"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-1 rounded bg-gray-800 border-gray-300/10 text-white"
            placeholder="Leave a comment..."
          />
          <button
            type="submit"
            className="transition-all w-20 cursor-pointer bg-blue-500 h-full hover:bg-blue-600 text-white text-sm font-bold p-1 rounded"
          >
            Comment
          </button>
        </form>
      )}
    </div>
  );
};
export default CommentForm;
