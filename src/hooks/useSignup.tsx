import { useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { API_ROUTES } from "../_common/api-routes";
import { message } from "antd";
import { SignupForm } from "../types/form.types";

function useSignup() {
  const { postData } = useAxios();
  return useMutation({
    mutationFn: (data: SignupForm) => {
      const { confirmPassword:_, ...rest } = data;
      return postData(API_ROUTES.AUTH.SIGNUP, rest);
    },
    onSuccess: () => {
      message.success("User creation successful");
    },
  });
}

export { useSignup };
