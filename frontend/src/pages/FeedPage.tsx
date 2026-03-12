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

        const data = Array.isArray(response.data)
          ? (response.data as Post[])
          : [];
        setPosts(data);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
    };

    handlePosts();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center pt-20 pb-60 px-4 md:px-8">
      <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.post_id} post={post} />)
        ) : (
          <div className="text-gray-400 text-center mt-10">No posts yet...</div>
        )}
      </div>

      <div className="fixed bottom-6 z-40 w-[90vw] max-w-2xl left-1/2 -translate-x-1/2">
        <PostForm />
      </div>
    </div>
  );
};

export default FeedPage;
