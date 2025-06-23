import { useQuery } from "@tanstack/react-query";
import { Market } from "../types/api.types";
import useAxios from "./useAxios";

export const useMarkets = () => {
  const { getData } = useAxios();
  return useQuery<Market[]>({
    queryKey: ["markets"],
    queryFn: () => getData("/markets"),
  });
};
