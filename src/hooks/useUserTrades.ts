import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Trade } from '../types/api.types';
import { API_ROUTES } from '../_common/api-routes';

export const useUserTrades = (active:boolean) => {
  const { getData } = useAxios();
  return useQuery<Trade[]>({
    queryKey: ['userTrades', active],
    queryFn: () => getData(API_ROUTES.TRADE.TRADES(active)),
  });
}; 