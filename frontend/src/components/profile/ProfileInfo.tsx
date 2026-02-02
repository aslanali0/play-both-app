import { useState } from "react";
import api from "../../api/api"
import type { User } from "../../types/user";
import { useAuth } from "../../context/AuthContext";

const API_URL = '/profile'

const ProfileInfo = () => {
  const { user, loading } = useAuth();
  const [bio, setBio] = useState(user?.profile?.bio);
  const [avatar, setAvatar] = useState(user?.profile?.avatar_url);
  const [isEditing, setIsEditing] = useState(false);
  const defaultAvatar = user?.username?.charAt(0).toUpperCase() || " ?";
  const handleUpdate = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const response = await api.post(
        `${API_URL}/update`,
        {
          bio: bio,
          avatar_url: avatar,
        },
        {
          params: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return response.data;

    } catch (error) {
      console.log("update profile error: " + error);
    }
  };
  return (
    <div className="w-full home-element shadow-xl overflow-hidden transition-all hover:shadow-2xl p-4 rounded-t-2xl flex flex-col items-center">
      <button
        onClick={() => setIsEditing(true)}
        className="mb-4 text-xs font-bold text-indigo-500 hover:text-indigo-700 cursor-pointer self-end"
      >
        Edit Profile
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="w-full flex flex-col items-center gap-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            type="url"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            className="w-1/2 bg-indigo-500 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors"
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
          {avatar ? (
            <img
              src={avatar}
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-md"
              alt="Profile"
            />
          ) : (
            <span className="flex items-center justify-center w-24 h-24 text-4xl rounded-full bg-indigo-500 font-black ">
              {defaultAvatar}
            </span>
          )}

          <div className="text-center">
            <p className="text-gray-300 font-light">
              <span className="font-bold text-indigo-600">Bio:</span>{" "}
              {bio || "Welcome to my profile!"}
            </p>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
export default ProfileInfo;
