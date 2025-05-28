import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market } from '../types/api.types';

export const useSearchMarkets = (searchTerm: string) => {
  const { getData } = useAxios();
  return useQuery<Market[]>({
    queryKey: ['markets', 'search', searchTerm],
    queryFn: () => getData('/markets/search', null, { q: searchTerm }),
    enabled: !!searchTerm,
  });
}; 