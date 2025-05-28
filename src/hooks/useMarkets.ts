import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market } from '../types/api.types';

export const useMarkets = () => {
  const { getData } = useAxios();
  return useQuery<Market[]>({
    queryKey: ['markets'],
    queryFn: () => getData('/markets'),
  });
}; 