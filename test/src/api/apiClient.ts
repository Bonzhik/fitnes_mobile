import axios from 'axios';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from '../utils/storage';

const api = axios.create({
  baseURL: 'https://629a-95-66-135-33.ngrok-free.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) { return null; }

    const response = await axios.post('https://629a-95-66-135-33.ngrok-free.app/api/auth/refresh', {
      refreshToken,
    });

    const { accessToken, newRefreshToken } = response.data;

    await saveRefreshToken(newRefreshToken);
    await saveAccessToken(accessToken);

    return accessToken;

  } catch (error) {
    console.error('Error in updating refresh-token', error);
    return null;
  }
};

api.interceptors.request.use(async (request) => {
  const token = await getAccessToken();
  console.log('token -', token)
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

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


api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
