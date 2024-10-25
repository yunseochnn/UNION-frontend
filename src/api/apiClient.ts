import axios from 'axios';
import { requestNewAccessToken } from './refreshToken';
import { useCookies } from 'react-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const [cookies] = useCookies(['Authorization']);
  const token = cookies['Authorization'];

  if (token) {
    config.headers['Authorization'] = token; // 쿠키에 저장된 토큰
  }
  return config;
});

// 새 토큰 요청
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const [cookies, setCookie] = useCookies(['Authorization', 'Refresh-Token']);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await requestNewAccessToken(cookies['Refresh-Token'], cookies['Authorization']);

        if (newAccessToken) {
          setCookie('Authorization', `Bearer ${newAccessToken}`, { path: '/' });
          apiClient.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        }
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
