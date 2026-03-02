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
    <div className="flex justify-center">
      {friendsList &&
        friendsList.map((friendProfile: UserProfile) => (
          <div className="p-10">
            <ProfileInfo
              key={friendProfile.username}
              isPublic={true}
              profile={friendProfile}
            />
            <Favorites isPublic={true} username={friendProfile.username} />
          </div>
        ))}
    </div>
  );
};

export default FriendsPage;
