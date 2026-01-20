import axios from "axios"
import { useEffect, useState } from "react"
import ProfileInfo from "../components/profile/ProfileInfo"
import type { User } from "../types/user"
import Favorites from "../components/profile/Favorites"

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get<User>("http://localhost:8000/profile/me", {
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
    <div className="min-h-screen w-full flex pt-20 justify-center  p-4">
      {!loading ? (<div>
        <ProfileInfo user={user} />
        <Favorites /></div>
      ) : <div>Loading...</div>
      }
    </div>
  )

}

export default ProfilePage;
