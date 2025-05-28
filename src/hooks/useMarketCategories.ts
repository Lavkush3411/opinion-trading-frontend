import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { MarketCategory } from '../types/api.types';

export const useMarketCategories = () => {
  const { getData } = useAxios();
  return useQuery<MarketCategory[]>({
    queryKey: ['marketCategories'],
    queryFn: () => getData('/markets/categories'),
  });
}; 