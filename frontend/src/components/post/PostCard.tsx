import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import type { Post } from "../../types/post";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
const PROFILE_API_URL = "/profile/user";
const LIKE_API_URL = "/posts/like";
const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    try {
      const response = api.get(PROFILE_API_URL, {
        params: { username: post.user.username },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(LIKE_API_URL, {
        ...post,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {post && (
        <div className="border-1 bg-gray-800/50 border-gray-300/10 rounded-lg p-4 m-4 w-lg">
          <div className="flex relative items-center gap-2 mb-2">
            <button className="cursor-pointer" onClick={handleProfileClick}>
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
            <div className="flex gap-1">
              <HandThumbUpIcon
                onClick={handleLike}
                className="w-5 cursor-pointer"
              />
              {post.likes}
            </div>
            <div className="flex gap-1">
              <HandThumbDownIcon className="w-5 cursor-pointer" />
              {post.dislikes}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
