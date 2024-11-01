import apiClient from './apiClient';
import Cookies from 'js-cookie';

const ReadBoardRequest = async (type: string, id: number) => {
  try {
    const response = await apiClient.get(`/board/${type}/${id}`, {
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

export default ReadBoardRequest;
