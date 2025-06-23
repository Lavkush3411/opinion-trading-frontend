import { useQuery } from "@tanstack/react-query";
import { Market } from "../types/api.types";
import useAxios from "./useAxios";
import { API_ROUTES } from "../_common/api-routes";
import { QUERY_KEYS } from "../_common/query-keys";

export const useMarkets = () => {
  const { getData } = useAxios();
  return useQuery<Market[]>({
    queryKey: [QUERY_KEYS.MARKETS],
    queryFn: () => getData(API_ROUTES.MARKET.MARKETS),
  });
};
