import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market } from '../types/api.types';

export const useMarket = (marketId: string) => {
  const { getData } = useAxios();
  return useQuery<Market>({
    queryKey: ['market', marketId],
    queryFn: () => getData('/markets', marketId),
    enabled: !!marketId,
  });
}; 