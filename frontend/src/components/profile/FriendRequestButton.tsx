import { useEffect, useState } from "react"
import api from "../../api/api"


const API_URL = "/friendship"
const FriendRequestButton = ({ sender, receiver }: { sender: string, receiver: string }) => {
  const [isRequestSent, setIsRequestSent] = useState(false)
  const handleFriendRequest = async (e: React.FormEvent<HTMLInputElement>) => {


    e.preventDefault()

    try {
      const response = await api.post(`${API_URL}/add`,
        {
          "request_sender": sender,
          "request_receiver": receiver,
          "status": "pending"
        });
      setIsRequestSent(true);
      return response.data;
    }
    catch (error) {
      return error
    }

  }
  useEffect(() => {
    const handleFriendshipStatus = async () => {
      try {
        const response = await api.get(`${API_URL}/status`, {
          params: {
            "sender": sender,
            "receiver": receiver
          }
        })
        const friendship_status = response.data
        if (friendship_status == "pending") { setIsRequestSent(true) }
      }
      catch (error) {
        return error
      }
    };
    handleFriendshipStatus()
  }, [])
  return (
    <div> {!isRequestSent ?
      <button onClick={(e) => handleFriendRequest(e)} className="">Send Friend Request</button>
      : <span className="text-white">Request Sent</span>}
    </div>


  )
}

export default FriendRequestButton;
