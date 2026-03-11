import { useEffect, useState } from "react";
import api from "../../api/api";
import type { Comment, Post } from "../../types/post";

const API_URL = "/posts/comments";
const Comments = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<[Comment] | null>(null);
  useEffect(() => {
    const handleComments = async () => {
      try {
        const response = await api.get(API_URL, {
          params: { post_id: post.post_id },
        });
        if (response) {
          setComments(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleComments();
  }, [post]);
  return (
    <div className="w-full flex flex-col items-center mt-2">
      {comments && (
        <>
          {" "}
          <span className="text-sm text-gray-400/60 font-light mb-2">
            Comments
          </span>
          {comments.map((comment) => (
            <div
              key={comment.created_at.toString()}
              className="border-1 bg-gray-800/50 border-gray-300/10 rounded-lg p-2 break-words m-4 w-full"
            >
              {comment.user?.username} - {comment.content}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
