import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import {  MarketDepth } from '../types/api.types';
import { API_ROUTES } from '../_common/api-routes';
import { useParams } from 'react-router-dom';

export const useMarketDepth = (marketId) => {
  const { getData } = useAxios();

  return useQuery<MarketDepth>({
    queryKey: ['market','depth', marketId],
    queryFn: () => getData(API_ROUTES.MARKET.DEPTH(marketId as string)),
    enabled: !!marketId,
  });
}; 