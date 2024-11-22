import axios from 'axios';
import { getRefreshToken, saveRefreshToken } from '../utils/storage';

const api = axios.create({
    baseURL: 'https://localhost:5176/api',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/json',
    },
});

const refreshAccessToken = async(): Promise<string | null> => {
    try{
        const refreshToken = await getRefreshToken();
        if(!refreshToken) {return null;}

        const response = await axios.post('https://localhost:5176/api/auth/refresh',{
            refreshToken,
        });
        const { accessToken, newRefreshToken } = response.data;

        await saveRefreshToken(newRefreshToken);

        return accessToken;

    } catch(error){
        console.error('Error in updating refresh-token', error);
        return null;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api.request(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

export default api;
