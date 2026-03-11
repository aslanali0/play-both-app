import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import type { Post } from "../../types/post";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
const PROFILE_API_URL = "/profile/user";
const POST_API_URL = "/posts";
const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const [localLikes, setLocalLikes] = useState(post.likes);
  const { user } = useAuth();

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      console.log(post);
      const response = await api.post(`${POST_API_URL}/like`, {
        post_id: post.post_id,
        username: user?.username,
      });
      setLocalLikes(localLikes + response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {post && (
        <div className="border-1 bg-gray-800/50 border-gray-300/10 rounded-lg p-4 m-4 w-lg">
          <div className="flex relative items-center gap-2 mb-2">
            <button
              className="cursor-pointer"
              onClick={() => {
                navigate(`/profile/${post.user.username}`);
              }}
            >
              {post.user.avatar_url ? (
                <img className="rounded-full w-12" src={post.user.avatar_url} />
              ) : (
                <span className="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-orange-500 font-black ">
                  {post.user?.username?.charAt(0).toUpperCase() || " ?"}{" "}
                </span>
              )}
            </button>
            {post.user.username}
            <div className="text-gray-400/60 font-light text-sm absolute end-0 flex">
              {new Date(post.created_at).toLocaleDateString("tr-TR")}
            </div>
          </div>
          {post.content}
          <div className="flex gap-5">
            <div className="flex items-start gap-1">
              <HandThumbUpIcon
                onClick={handleLike}
                className="w-5 cursor-pointer"
              />
              {localLikes}
            </div>
            <CommentForm post={post} />
          </div>
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
