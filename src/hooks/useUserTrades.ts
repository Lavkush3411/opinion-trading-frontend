import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Order, TradeModel } from '../types/api.types';
import { API_ROUTES } from '../_common/api-routes';
import { QUERY_KEYS } from '../_common/query-keys';

export const useUserTrades = (active:boolean) => {
  const { getData } = useAxios();
  return useQuery<{fulfilled:TradeModel[], unfulfilled:Order[]}>({
    queryKey: [QUERY_KEYS.USER_TRADES, active],
    queryFn: () => getData(API_ROUTES.TRADE.TRADES(active)),
  });
}; 