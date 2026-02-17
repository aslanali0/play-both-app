import { useEffect, useState } from "react";
import api from "../../api/api";
import type { FriendshipRequest } from "../../types/user";

const FRIENDSHIP_API_URL = '/friendship'

const FriendshipRequests = ({ username }: { username: string }) => {

  const [friendshipRequests, setFriendshipRequests] = useState(null)

  useEffect(() => {
    const handleFriendshipNotifications = async () => {

      try {
        const response = await api.get(`${FRIENDSHIP_API_URL}/requests`, {
          params: {
            "receiver": username
          }
        });
        const requests = response.data;
        setFriendshipRequests(requests);
        return requests
      }
      catch (error) {
        console.log(error)
      }

    }
    handleFriendshipNotifications()
  })

  const handleFriendshipResponse = async () => {

  }

  return (
    <div>

      {friendshipRequests ? (
        <div>
          {friendshipRequests.map((request: FriendshipRequest) => (
            <div>
              <span>You got a friendship request from : {request.sender}</span>
              <button onClick={}>Accept</button>
              <button>Reject</button>
            </div>

          ))}
        </div>) : null}
    </div>
  )
}

export default FriendshipRequests
