import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import type { User, UserProfile } from "../types/user";
import Favorites from "../components/profile/Favorites";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Post } from "../types/post";
import PostCard from "../components/post/PostCard";

const API_URL = "/profile";
const POSTS_API_URL = "/posts";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<[Post] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const response = await api.get<User>(`${API_URL}/me`, {
          params: {
            username: user?.username,
          },
        });

        const profile_data = response.data;
        setProfile(profile_data);
        setLoading(false);
      } catch (error) {
        console.log("fetch profile error: " + error);
      }
    };
    const handlePosts = async () => {
      try {
        const response = await api.get(`${POSTS_API_URL}/user`, {
          params: {
            username: user?.username,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.log("fetch posts error: " + error);
      }
    };
    handlePosts();
    handleProfile();
  }, [user?.username]);
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden pt-20 pb-10 flex justify-center px-4 md:px-8">
      {!loading ? (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col gap-6 md:gap-8">
          <ProfileInfo isPublic={false} profile={profile} />
          <Favorites isPublic={false} username={user?.username} />

          <div className="flex flex-col w-full bg-gray-800/30 rounded-xl p-3 sm:p-5 md:p-6 items-center">
            <span className="text-base sm:text-lg text-center w-full mb-4 md:mb-6 font-medium">
              Posts
            </span>
            <div className="w-full flex flex-col gap-4">
              {posts &&
                posts.map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-pulse text-lg mt-10">Loading...</div>
      )}
    </div>
  );
};

export default ProfilePage;
