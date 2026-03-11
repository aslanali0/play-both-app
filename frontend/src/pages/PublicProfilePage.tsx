import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import type { User, UserProfile } from "../types/user";
import Favorites from "../components/profile/Favorites";
import api from "../api/api";
import type { Post } from "../types/post";
import PostCard from "../components/post/PostCard";
import { useParams } from "react-router-dom";

const API_URL = "/profile";
const POSTS_API_URL = "/posts";

const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<[Post] | null>(null);
  const toUserProfile = (u: User): UserProfile => ({
    ...u,
    bio: (u as any).bio ?? "", // veya u.bio varsa direkt u.bio
    avatar_url: (u as any).avatar_url ?? "", // default
  });
  useEffect(() => {
    const handleProfile = async () => {
      try {
        const response = await api.get<User>(`${API_URL}/me`, {
          params: {
            username: username,
          },
        });

        const profile_data = response.data;
        setProfile(toUserProfile(profile_data));
        setLoading(false);
      } catch (error) {
        console.log("fetch profile error: " + error);
      }
    };
    const handlePosts = async () => {
      try {
        const response = await api.get(`${POSTS_API_URL}/user`, {
          params: {
            username: username,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.log("fetch posts error: " + error);
      }
    };
    handlePosts();
    handleProfile();
  }, [username]);
  return (
    <div className="min-h-screen box-border flex w-full pt-20 justify-center ">
      {!loading ? (
        <div>
          {profile && <ProfileInfo isPublic={true} profile={profile} />}
          {username && <Favorites isPublic={true} username={username} />}
          <div className="flex w-full mx-auto justify-center items-center bg-gray-800/30 m-5 rounded-xl flex-col">
            <span className="text-lg text-center p-7  w-full rounded-lg mt-5">
              Posts:{" "}
            </span>
            {posts &&
              posts.map((post) => <PostCard key={post.post_id} post={post} />)}
          </div>
        </div>
      ) : (
        <div className="animate-pulse">Loading...</div>
      )}
    </div>
  );
};

export default PublicProfilePage;
