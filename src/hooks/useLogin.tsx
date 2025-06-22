import { message } from "antd";
import { API_ROUTES } from "../_common/api-routes";
import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

function useLogin() {
  const { postData } = useAxios();
  return useMutation({
    mutationFn: (data: object) => postData(API_ROUTES.AUTH.LOGIN, data),
    onSuccess: (response) => {
      message.success("Logged In");
    },
  });
}

export { useLogin };
