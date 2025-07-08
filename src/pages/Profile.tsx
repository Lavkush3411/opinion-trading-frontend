import React from "react";
import { useUser } from "../hooks/useUser";
import { useGlobalStore } from "../state/useGlobalStore";
import UserProfilePage from "../components/user/UserProfilePage";
import { Spin } from "antd";

function Profile() {
  const { userId } = useGlobalStore();
  const { data: user, isPending } = useUser(userId || "");
  if (isPending) return <Spin />;
  return <UserProfilePage user={user} />;
}

export default Profile;
