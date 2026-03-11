import React, { useState } from "react";
import FriendshipRequests from "./FriendshipRequests";
import { useAuth } from "../../context/AuthContext";
import { BellIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className="relative flex items-center">
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[40] cursor-default"
            onClick={() => setOpen(false)}
          />,
          document.body,
        )}

      <button
        onClick={toggleDropdown}
        className="relative z-[41] focus:outline-none"
      >
        <BellIcon className="h-6 w-6 md:h-7 md:w-7 text-orange-500 hover:text-orange-400 cursor-pointer transition-colors" />
      </button>

      <div
        className={`${open ? "opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"} 
absolute right-0 top-full mt-2 
w-[60vw] max-w-[320px]
bg-stone-900/95 backdrop-blur-md transition-all ease-out duration-300 
rounded-xl border border-orange-500/50 z-[50] shadow-2xl p-4 
overflow-hidden flex flex-col`}
      >
        <h3 className="text-white font-semibold mb-3 border-b border-gray-700 pb-2 text-sm md:text-base">
          Notifications
        </h3>

        <div className="max-h-[60vh] overflow-y-auto">
          <FriendshipRequests username={user?.username} />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
