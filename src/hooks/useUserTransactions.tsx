import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../_common/api-routes";
import { QUERY_KEYS } from "../_common/query-keys";
import useAxios from "./useAxios";

const useUserTransactions = () => {
  const { getData } = useAxios();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_TRANSACTIONS],
    queryFn: () => getData(API_ROUTES.USER.GET_TRANSACTIONS),
  });
};

export { useUserTransactions };
