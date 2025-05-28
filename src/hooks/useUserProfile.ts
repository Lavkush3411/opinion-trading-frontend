import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { UserProfile } from '../types/api.types';

export const useUserProfile = () => {
  const { getData } = useAxios();
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: () => getData("/user/profile") as Promise<UserProfile>,
  });
};
