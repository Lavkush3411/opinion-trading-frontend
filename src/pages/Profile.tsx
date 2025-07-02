import React from "react";
import { useUser } from "../hooks/useUser";
import { useGlobalStore } from "../state/useGlobalStore";
import { Card } from "antd";

function Profile() {
  const { userId } = useGlobalStore();
  const { data: user, isPending } = useUser(userId || "");
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full h-full rounded-none border-none">
      <Card className="w-full p-4 bg-transparent rounded-none border-none">
        <div>
          <h1>Profile</h1>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Balance: {user?.balance}</p>
          <p>Hold Balance: {user?.hold_balance}</p>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
