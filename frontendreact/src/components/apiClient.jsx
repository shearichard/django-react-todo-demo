import axios from 'axios';

import { BACKEND_SCHEME_HOST_PORT } from "./Constants";

const apiClient = axios.create({
    baseURL: BACKEND_SCHEME_HOST_PORT 
});

// Attach interceptors for consistent error handling
apiClient.interceptors.response.use(
  //
  (response) => response, // Pass successful responses directly
  (error) => {
    if (error.response) {
      // Extract and map error messages
      const errorData = error.response.data;
      const errorMessage =
      errorData.errors?.map((err) => err.detail).join(', ') || 'Unknown error';
      throw new Error(errorMessage); // Throw formatted error
    } else {
      // Handle network or other errors
      throw error; // Retain the original error for debugging
    }
  }
);

export default apiClient;

