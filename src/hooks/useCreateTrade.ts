import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';
import { CreateTradeData, Trade } from '../types/api.types';

export const useCreateTrade = () => {
  const { postData } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Trade, Error, CreateTradeData>({
    mutationFn: (tradeData) => postData('/trades', tradeData),
    onSuccess: () => {
      queryClient.invalidateQueries(['markets']);
      queryClient.invalidateQueries(['trades']);
    },
  });
}; 