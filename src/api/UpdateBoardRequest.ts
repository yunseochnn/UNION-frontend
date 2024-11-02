import apiClient from './apiClient';
import Cookies from 'js-cookie';

const UpdateBoardRequest = async (title: string, content: string, type: string, id: number) => {
  try {
    const response = await apiClient.put(
      `/board/${type}/${id}`,
      {
        title: title,
        content: content,
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

export default UpdateBoardRequest;
