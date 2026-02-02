import axios from "axios"
import { useEffect, useState } from "react"
import ProfileInfo from "../components/profile/ProfileInfo"
import type { User } from "../types/user"
import Favorites from "../components/profile/Favorites"
import api from "../api/api"

const API_URL = '/profile'

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await api.get<User>(`${API_URL}/me`, {
          params: {
            token: token
          }
        });

        const profile_data = response.data;
        setUser(profile_data)
        setLoading(false)
      }
      catch (error) {
        console.log("fetch profile error: " + error)
      }
    }
    handleProfile();
  }, [])
  return (
    <div className="min-h-screen box-border w-full  pt-20 justify-center p-4">
      {!loading ? (<div>
        <ProfileInfo />
        <Favorites /></div>
      ) : <div>Loading...</div>
      }
    </div>
  )

}

export default ProfilePage;
