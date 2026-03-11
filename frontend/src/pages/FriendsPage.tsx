import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import type { UserProfile } from "../types/user";
import ProfileInfo from "../components/profile/ProfileInfo";
import Favorites from "../components/profile/Favorites";

const API_URL = "/friendship";

const FriendsPage = () => {
  const [friendsList, setFriendsList] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await api.get(`${API_URL}/friends/profiles`, {
          params: { username: user?.username },
        });
        const friendsProfiles = response.data;
        setFriendsList(friendsProfiles);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [user?.username]);

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 gap-10">
      {friendsList && friendsList.length > 0 ? (
        friendsList.map((friendProfile: UserProfile) => (
          <div
            key={friendProfile.username}
            className="w-full max-w-3xl flex flex-col gap-4 bg-gray-900/20 p-4 sm:p-6 rounded-2xl border border-gray-700/20 transition-all hover:bg-gray-900/30"
          >
            <ProfileInfo isPublic={true} profile={friendProfile} />

            <div className="w-full">
              <Favorites isPublic={true} username={friendProfile.username} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400 mt-10 italic">No friends found yet.</div>
      )}
    </div>
  );
};

export default FriendsPage;
