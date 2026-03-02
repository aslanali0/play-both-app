import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import type { User, UserProfile } from "../types/user";
import Favorites from "../components/profile/Favorites";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const API_URL = "/profile";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
    handleProfile();
  }, [user?.username]);
  return (
    <div className="min-h-screen box-border flex w-full pt-20 justify-center p-4">
      {!loading ? (
        <div>
          <ProfileInfo isPublic={false} profile={profile} />
          <Favorites isPublic={false} username={user?.username} />
        </div>
      ) : (
        <div className="animate-pulse">Loading...</div>
      )}
    </div>
  );
};

export default ProfilePage;
