import { useState } from "react";
import SearchUserBar from "../components/SearchUserBar";
import ProfileInfo from "../components/profile/ProfileInfo";
import type { UserProfile } from "../types/user";

const CommunityPage = () => {
  const [searched, setSearched] = useState<UserProfile | null>(null);

  return (
    <div className="items-center flex flex-col gap-5 w-full">
      <SearchUserBar onSearched={setSearched} />
      {searched && (
        <ProfileInfo
          key={searched.username}
          isPublic={true}
          profile={searched}
        />
      )}
    </div>
  );
};

export default CommunityPage;
