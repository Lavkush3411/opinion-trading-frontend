import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market, ResolutionData } from '../types/api.types';

interface ResolveMarketParams {
  marketId: string;
  resolutionData: ResolutionData;
}

export const useResolveMarket = () => {
  const { putData } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Market, Error, ResolveMarketParams>({
    mutationFn: ({ marketId, resolutionData }) =>
      putData('/markets', marketId, resolutionData),
    onSuccess: () => {
      queryClient.invalidateQueries(['markets']);
      queryClient.invalidateQueries(['trades']);
    },
  });
}; 