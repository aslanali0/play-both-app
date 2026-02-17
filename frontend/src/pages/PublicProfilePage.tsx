import { useEffect, useState } from "react"
import ProfileInfo from "../components/profile/ProfileInfo"
import type { User, UserProfile } from "../types/user"
import Favorites from "../components/profile/Favorites"
import api from "../api/api"
import { useAuth } from "../context/AuthContext"

const API_URL = '/profile'

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const response = await api.get<User>(`${API_URL}/user`, {

          params: {
          username: user?.username
        }});

        const profile_data = response.data;
        setProfile(profile_data)
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
        <ProfileInfo isPublic={true} profile={profile}/>
        <Favorites isPublic={true}/></div>
      ) : <div>Loading...</div>
      }
    </div>
  )

}

export default ProfilePage;
