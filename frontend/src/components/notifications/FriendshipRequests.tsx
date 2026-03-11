import { useEffect, useState } from "react";
import api from "../../api/api";
import type { FriendshipRequest } from "../../types/user";

const FRIENDSHIP_API_URL = "/friendship";

const FriendshipRequests = ({ username }: { username: string }) => {
  const [friendshipRequests, setFriendshipRequests] = useState<
    FriendshipRequest[]
  >([]);
  const handleFriendshipNotifications = async () => {
    try {
      const response = await api.get(`${FRIENDSHIP_API_URL}/requests`, {
        params: {
          receiver: username,
        },
      });
      const requests = response.data;
      setFriendshipRequests(requests);
      return requests;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      await handleFriendshipNotifications();
    };
    fetchRequests();
  }, [username]);

  const handleFriendshipResponse = async (
    friendshipResponse: string,
    sender: string,
  ) => {
    try {
      const response = await api.post(`${FRIENDSHIP_API_URL}/respond`, {
        request_sender: sender,
        request_receiver: username,
        response: friendshipResponse,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      {friendshipRequests ? (
        <div>
          {friendshipRequests.map((request: FriendshipRequest) => (
            <div
              key={request.request_sender}
              className="gap-2  border border-stone-500 bg-stone-800 rounded z-[10]"
            >
              <span className="p-2 font-light">
                You got a friendship request from: {request.request_sender}
              </span>
              <br />
              <br />
              <div className="flex m-0">
                <button
                  className="bg-orange-400 hover:bg-orange-600 font-thin w-full text-white px-3 py-1 transition-all cursor-pointer"
                  onClick={async () => {
                    await handleFriendshipResponse(
                      "accepted",
                      request.request_sender,
                    );
                    await handleFriendshipNotifications();
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 w-full text-white px-3 py-1 font-thin hover:bg-red-700 transition-all cursor-pointer"
                  onClick={async () => {
                    await handleFriendshipResponse(
                      "blocked",
                      request.request_sender,
                    );
                    await handleFriendshipNotifications();
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FriendshipRequests;
