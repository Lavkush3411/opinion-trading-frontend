import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Trade } from '../types/api.types';

export const useUserTrades = () => {
  const { getData } = useAxios();
  return useQuery<Trade[]>({
    queryKey: ['userTrades'],
    queryFn: () => getData('/user/trades'),
  });
}; 