import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { CreateTradeData, Trade } from "../types/api.types";
import { API_ROUTES } from "../_common/api-routes";

export const useCreateTrade = () => {
  const { postData } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Trade, Error, CreateTradeData>({
    mutationFn: ({marketId,...tradeData}) => postData(API_ROUTES.TRADE.CREATE(marketId), tradeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markets"] });
      queryClient.invalidateQueries({ queryKey: ["trades"] });
    },
  });
};
