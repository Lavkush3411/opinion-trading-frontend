import { message } from "antd";
import { API_ROUTES } from "../_common/api-routes";
import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { LoginForm } from "../types/form.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../_common/routes";

function useLogin() {
  const { postData } = useAxios();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginForm) => postData(API_ROUTES.AUTH.LOGIN, data),
    onSuccess: (response) => {
      message.success("Logged In");
      localStorage.setItem("token", response.token);
      navigate(ROUTES.DASHBOARD.HOME);
    },
  });
}

export { useLogin };
