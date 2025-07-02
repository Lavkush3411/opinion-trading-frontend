import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { CreateTradeData, Trade } from "../types/api.types";
import { API_ROUTES } from "../_common/api-routes";
import { useModelStore } from "../state/useModelStore";
import { QUERY_KEYS } from "../_common/query-keys";
import { useGlobalStore } from "../state/useGlobalStore";

export const useCreateTrade = () => {
  const { postData } = useAxios();
  const queryClient = useQueryClient();
  const { setIsTradeModalVisible } = useModelStore();
  const { userId } = useGlobalStore();  
  return useMutation<Trade, Error, CreateTradeData>({
    mutationFn: ({ marketId, ...tradeData }) =>
      postData(API_ROUTES.TRADE.CREATE(marketId), tradeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markets"] });
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER, userId] });
      setIsTradeModalVisible(false);
    },
  });
};
