import { useEffect, useState } from "react";
import api from "../../api/api";

const API_URL = "/friendship";
const FriendRequestButton = ({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}) => {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [friendshipStatus, setFriendshipstatus] = useState("");
  const handleFriendRequest = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const response = await api.post(`${API_URL}/add`, {
        request_sender: sender,
        request_receiver: receiver,
        status: "pending",
      });
      setIsRequestSent(true);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    const handleFriendshipStatus = async () => {
      try {
        const response = await api.get(`${API_URL}/status`, {
          params: {
            sender: sender,
            receiver: receiver,
          },
        });
        const friendship_status = response.data;
        if (friendship_status) {
          setIsRequestSent(true);
          console.log(friendship_status);
          if (friendship_status == "accepted") {
            setFriendshipstatus("Friend");
          } else {
            setFriendshipstatus("Friend Request " + friendship_status);
          }
        }
      } catch (error) {
        return error;
      }
    };
    handleFriendshipStatus();
  }, [receiver]);
  return (
    <div>
      {" "}
      {!isRequestSent ? (
        <button
          onClick={(e) => {
            handleFriendRequest(e);
          }}
          className=""
        >
          <span className="cursor-pointer"> Send Friend Request</span>
        </button>
      ) : (
        friendshipStatus && (
          <span className="text-white">{friendshipStatus.toUpperCase()}</span>
        )
      )}
    </div>
  );
};

export default FriendRequestButton;
