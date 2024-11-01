import apiClient from './apiClient';
import Cookies from 'js-cookie';

const SaveImageRequest = async (id: number, targetType: string, urls: string[]) => {
  try {
    const response = await apiClient.post(
      '/photo/save',
      {
        targetId: id,
        targetType: targetType,
        urls: urls,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SaveImageRequest;
