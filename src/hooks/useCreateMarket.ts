import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market } from '../types/api.types';

export const useCreateMarket = () => {
  const { postData } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Market>({
    mutationFn: (marketData) => postData('/markets', marketData) as Promise<Market>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markets'] });
    },
  });
}; 