import { useEffect, useState } from "react";
import api from "../api/api";
import PostCard from "../components/post/PostCard";
import type { Post } from "../types/post";
import PostForm from "../components/post/PostForm";

const API_URL = "/posts/all";

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const handlePosts = async () => {
      try {
        const response = await api.get(API_URL);
        if (response) {
          setPosts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handlePosts();
  }, []);
  return (
    <div className=" flex justify-center items-center flex-col pb-40">
      {posts &&
        posts.map((post) => <PostCard key={post.post_id} post={post} />)}
      <div className="fixed bottom-10 w-lg">
        <PostForm />
      </div>
    </div>
  );
};

export default FeedPage;
