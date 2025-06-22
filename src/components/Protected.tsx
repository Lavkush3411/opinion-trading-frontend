import React from "react";
import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../hooks";
import { ROUTES } from "../_common/routes";
import { Spin } from "antd";

function Protected({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useActiveUser();
  if (isLoading) return <Spin size="large" />;
  if (error || !data) navigate(ROUTES.AUTH.AUTH, { replace: true });
  return <div>{children}</div>;
}

export default Protected;
