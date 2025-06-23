import { message } from "antd";
import { API_ROUTES } from "../_common/api-routes";
import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { LoginForm } from "../types/form.types";

function useLogin() {
  const { postData } = useAxios();
  return useMutation({
    mutationFn: (data: LoginForm) => postData(API_ROUTES.AUTH.LOGIN, data),
    onSuccess: () => {
      message.success("Logged In");
    },
  });
}

export { useLogin };
