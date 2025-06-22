import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "../_common/api-routes";
import { QUERY_KEYS } from "../_common/query-keys";
import useAxios from "./useAxios";

const useActiveUser = () => {
  const { getData } = useAxios();
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => getData(API_ROUTES.AUTH.ACTIVE_USER),
  });
};

export { useActiveUser };
