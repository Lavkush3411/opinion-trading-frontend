import axios, { AxiosResponse } from "axios";
import { message } from "antd";
const API_URL = import.meta.env.VITE_API_URL;
export default function useAxios() {
  const getData = async (path: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response: AxiosResponse = await axios.get(API_URL + path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      message.error(error.response.data.message);
      throw error;
    }
  };

  const postData = async (path: string, data: object) => {
    try {
      const token = localStorage.getItem("token") || "";

      const response = await axios.post(API_URL + path, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      message.error(error.response.data.message);
      throw error;
    }
  };

  return { getData, postData };
}
