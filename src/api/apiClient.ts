import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { requestNewAccessToken } from './refreshToken';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터에서 Authorization 헤더 설정
apiClient.interceptors.request.use(config => {
  const token = Cookies.get('Authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

// 응답 인터셉터에서 새 토큰 요청
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('Refresh-Token') ?? '';
        const authorizationToken = Cookies.get('Authorization') ?? '';

        const newAccessToken = await requestNewAccessToken(refreshToken, authorizationToken);

        if (newAccessToken) {
          Cookies.set('Authorization', `Bearer ${newAccessToken}`, { path: '/' });
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('토큰 갱신 실패:', err.message);
        } else {
          console.error('토큰 갱신 중 알 수 없는 오류 발생:', err);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
