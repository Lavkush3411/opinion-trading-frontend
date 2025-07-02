import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { API_ROUTES } from "../_common/api-routes";
import { QUERY_KEYS } from "../_common/query-keys";

function useDeclareResult() {
  const { postData } = useAxios();
  const queryClient = useQueryClient();
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
    },
  });
}

export default useDeclareResult;
