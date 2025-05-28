import { useCallback } from "react";
import axios from "axios";
import { API_BASE_URL as BASE_URL } from "../_common/env";

// Retrieving base URL from Vite environment variable
const safeRequest = async (func) => {
  try {
    const response = await func();
    return response;
  } catch (error) {
    console.log("Error with POST request:", error);
    throw error;
  }
};

const useAxios = () => {
  const COMMON_HEADERS = {
    "Content-Type": "application/json",
  };

  const FORM_DATA_HEADERS = {
    "Content-Type": "multipart/form-data",
  };

  const getData = useCallback(
    /**
     * function given to callback returns another function called safe request
     */
    async (url, id = null, params) =>
      /**
       * safe request function is called takes two args as input
       * first is function that makes api call
       */
      safeRequest(async () => {
        // Construct the base URL
        let fullUrl = `${BASE_URL}${url}`;

        // Check if id is provided
        if (id) {
          if (Array.isArray(id)) {
            // Join array elements into a single string separated by slashes
            fullUrl = `${fullUrl}/${id.join("/")}`;
          } else {
            // Use id directly if it's a string
            fullUrl = `${fullUrl}/${id}`;
          }
        }

        // Append the params object as a query string if provided
        if (params && typeof params === "object") {
          // Convert the params object to a query string
          const queryString = new URLSearchParams(params).toString();
          fullUrl = `${fullUrl}?${queryString}`;
        }

        // Make the GET request with the full URL
        const response = await axios.get(fullUrl, {
          headers: COMMON_HEADERS,
          withCredentials: true,
        });

        // Return the response data
        return response.data;
      }),
    []
  );

  const postData = useCallback(
    async (url, data = {}) =>
      safeRequest(async () => {
        // Determine if data is FormData
        const isFormData = data instanceof FormData;
        const response = await axios.post(`${BASE_URL}${url}`, data, {
          headers: isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS,
          withCredentials: true,
        });
        return response.data;
      }),
    []
  );

  const putData = useCallback(
    async (url, ids = null, data = {}) =>
      safeRequest(async () => {
        try {
          // Determine if `ids` is an array or a single value and append appropriately
          const idsPath = Array.isArray(ids) ? ids.join("/") : ids ? ids : "";

          // Construct the final URL with the ids path if provided
          const finalUrl = idsPath
            ? `${BASE_URL}${url}/${idsPath}`
            : `${BASE_URL}${url}`;

          const response = await axios.put(finalUrl, data, {
            headers: COMMON_HEADERS,
            withCredentials: true,
          });

          return response.data;
        } catch (error) {
          console.error("Error with PUT request:", error);
          throw error;
        }
      }),
    []
  );

  const patchData = useCallback(
    async (url, data = {}) =>
      safeRequest(async () => {
        try {
          // Determine if `ids` is an array or a single value and append appropriately

          // Construct the final URL with the ids path if provided
          const finalUrl = `${BASE_URL}${url}`;
          const isFormData = data instanceof FormData;

          const response = await axios.patch(finalUrl, data, {
            headers: isFormData ? FORM_DATA_HEADERS : COMMON_HEADERS,
            withCredentials: true,
          });

          return response.data;
        } catch (error) {
          console.error("Error with PUT request:", error);
          throw error;
        }
      }),
    []
  );

  const deleteData = useCallback(
    async (url, id = "", data = {}) =>
      safeRequest(async () => {
        try {
          const fullUrl = id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`;
          const response = await axios.delete(fullUrl, {
            headers: COMMON_HEADERS,
            withCredentials: true,
            data,
          });
          return response.data;
        } catch (error) {
          console.error("Error with DELETE request:", error);
          throw error;
        }
      }),
    []
  );

  const putFile = useCallback(async (url, file, options = {}) => {
    return safeRequest(async () => {
      try {
        const response = await axios.put(url, file, {
          headers: options.headers || {}, // Pass any custom headers
          onUploadProgress: options.onUploadProgress, // Handle upload progress
        });
        return response;
      } catch (error) {
        console.error("Error with PUT request:", error);
        throw error;
      }
    });
  }, []);

  return { getData, postData, putData, deleteData, patchData, putFile };
};

export default useAxios;
