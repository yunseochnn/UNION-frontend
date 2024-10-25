import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export async function requestNewAccessToken(refreshToken: string, token: string) {
  try {
    const response = await axios.post(`${apiBaseURL}/user/token?token=${token}`, null, {
      headers: {
        'Refresh-Token': refreshToken,
      },
    });

    const newAccessToken = response.headers['authorization']?.replace('Bearer ', '');
    return newAccessToken;
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    throw error;
  }
}
