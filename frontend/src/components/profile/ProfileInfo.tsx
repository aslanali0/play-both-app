import { useState } from "react";
import api from "../../api/api";
import type { UserProfile } from "../../types/user";
import { useAuth } from "../../context/AuthContext";
import FriendRequestButton from "./FriendRequestButton";
import { useNavigate } from "react-router-dom";

const API_URL = "/profile";

const ProfileInfo = ({
  profile,
  isPublic,
}: {
  profile: UserProfile;
  isPublic: boolean;
}) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [bio, setBio] = useState(profile?.bio);
  const [avatar, setAvatar] = useState(profile?.avatar_url);
  const [isEditing, setIsEditing] = useState(false);
  const defaultAvatar = user?.username?.charAt(0).toUpperCase() || " ?";
  const handleUpdate = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `${API_URL}/update`,
        {
          username: user?.username,
          bio: bio,
          avatar_url: avatar,
        },
        {
          params: {
            token: localStorage.getItem("token"),
          },
        },
      );
      setIsEditing(false);
      return response.data;
    } catch (error) {
      console.log("update profile error: " + error);
    }
  };

  return (
    <div className="w-3xl animate-slide-up home-element shadow-xl overflow-hidden transition-all hover:shadow-2xl p-4 rounded-t-2xl flex-col">
      <div className="flex flex-col w-full font-bold text-right text-sm text-orange-500 hover:text-orange-700 transition-all">
        {!isPublic ? (
          <button
            onClick={() => setIsEditing(true)}
            className="self-end cursor-pointer"
          >
            Edit Profile
          </button>
        ) : (
          <FriendRequestButton
            sender={user?.username}
            receiver={profile.username}
          />
        )}
      </div>
      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            className="w-1/2 bg-orange-500 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors"
            type="submit"
            value="Update"
          />
          <input
            className="w-1/2 bg-red-500 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
            type="button"
            onClick={(): void => {
              setIsEditing(false);
            }}
            value={"Cancel"}
          />
        </form>
      ) : !loading ? (
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={() => {
              navigate(`/profile/${profile.username}`);
            }}
            className="cursor-pointer"
          >
            {avatar ? (
              <img
                src={avatar}
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-500 shadow-md"
                alt="Profile"
              />
            ) : (
              <span className="flex items-center justify-center w-24 h-24 text-4xl rounded-full bg-orange-500 font-black ">
                {defaultAvatar}
              </span>
            )}
          </div>
          <div>{profile.username}</div>

          <div className="text-center">
            <p className="text-gray-300 font-light">
              <span className="font-bold text-orange-600">Bio:</span>{" "}
              {bio || "Welcome to my profile!"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProfileInfo;
