import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Market } from '../types/api.types';
import { useModelStore } from '../state/useModelStore';

export const useCreateMarket = () => {
  const { postData } = useAxios();
  const queryClient = useQueryClient();
  const {  setIsCreateMarketModalVisible } =
  useModelStore();

  return useMutation<Market, unknown, object>({
    mutationFn: (marketData:object) => postData('/market', marketData) as Promise<Market>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markets'] });
      setIsCreateMarketModalVisible(false);
    },
  });
}; 