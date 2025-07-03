import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { API_ROUTES } from "../_common/api-routes";
import { QUERY_KEYS } from "../_common/query-keys";
import { useModelStore } from "../state/useModelStore";

function useDeclareResult() {
  const { postData } = useAxios();
  const queryClient = useQueryClient();
  const { setIsDeclareResultModalVisible } = useModelStore();
  return useMutation({
    mutationFn: ({
      marketId,
      result,
    }: {
      marketId: string;
      result: boolean;
    }) => {
      return postData(API_ROUTES.MARKET.DECLARE_RESULT(marketId), {
        result,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MARKETS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      setIsDeclareResultModalVisible(false);
    },
  });
}

export default useDeclareResult;
