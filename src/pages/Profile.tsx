import React from "react";
import { useUser } from "../hooks/useUser";
import { useGlobalStore } from "../state/useGlobalStore";
import UserProfilePage from "../components/user/UserProfilePage";

function Profile() {
  const { userId } = useGlobalStore();
  const { data: user, isPending } = useUser(userId || "");
  if (isPending) return <div>Loading...</div>;
  return <UserProfilePage user={user} />;
}

export default Profile;
