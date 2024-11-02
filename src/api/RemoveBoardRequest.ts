import apiClient from './apiClient';
import Cookies from 'js-cookie';

const RemoveBoardRequest = async (type: string, id: number) => {
  try {
    const response = await apiClient.delete(`/board/${type}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('Authorization'),
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default RemoveBoardRequest;
