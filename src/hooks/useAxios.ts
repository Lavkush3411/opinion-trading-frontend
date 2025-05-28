import { useCallback } from 'react';
import { mockMarkets, mockCategories, mockUserProfile } from '../services/mockData';

const useAxios = () => {
  const getData = useCallback(async (url: string, id?: string | string[] | null, params?: any) => {
    const requestId = crypto.randomUUID();
    console.log(`[${requestId}] GET ${url}`, { id, params });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let response;
    if (url === '/markets') {
      if (id) {
        response = mockMarkets.find(market => market.id === id);
      } else {
        response = mockMarkets;
      }
    } else if (url === '/markets/categories') {
      response = mockCategories;
    } else if (url === '/user/profile') {
      response = mockUserProfile;
    } else if (url === '/markets/search') {
      const searchTerm = params?.q?.toLowerCase() || '';
      response = mockMarkets.filter(market => 
        market.title.toLowerCase().includes(searchTerm) ||
        market.description.toLowerCase().includes(searchTerm)
      );
    }

    console.log(`[${requestId}] Response:`, response);
    return response;
  }, []);

  const postData = useCallback(async (url: string, data: any) => {
    const requestId = crypto.randomUUID();
    console.log(`[${requestId}] POST ${url}`, data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = data;
    console.log(`[${requestId}] Response:`, response);
    return response;
  }, []);

  const putData = useCallback(async (url: string, id: string | string[] | null, data: any) => {
    const requestId = crypto.randomUUID();
    console.log(`[${requestId}] PUT ${url}/${id}`, data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = data;
    console.log(`[${requestId}] Response:`, response);
    return response;
  }, []);

  const deleteData = useCallback(async (url: string, id: string) => {
    const requestId = crypto.randomUUID();
    console.log(`[${requestId}] DELETE ${url}/${id}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = { success: true };
    console.log(`[${requestId}] Response:`, response);
    return response;
  }, []);

  return {
    getData,
    postData,
    putData,
    deleteData,
  };
};

export default useAxios; 