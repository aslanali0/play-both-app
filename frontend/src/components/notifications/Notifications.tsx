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
    <div className="relative flex">
      {open &&
        createPortal(
          <div
            className="absloute fixed inset-0 z-[9] bg-transparent cursor-default"
            onClick={() => setOpen(false)}
          />,
          document.body,
        )}
      <button onClick={toggleDropdown}>
        <BellIcon className="h-6 w-6 text-orange-900 cursor-pointer" />
      </button>
      <div
        className={`${open ? "opacity-100 translate-y-4" : "opacity-0 pointer-events-none font-thin translate-y-0"} absolute right-0 mt-10 w-90 bg-stone-900/80 transition-all ease-in-out duration-300 rounded-xl border border-orange-500/70 z-50 shadow-lg p-4`}
      >
        Notifications:
        <FriendshipRequests username={user?.username} />
        {/* Add other notification components here */}
      </div>
    </div>
  );
};

export default Notifications;
