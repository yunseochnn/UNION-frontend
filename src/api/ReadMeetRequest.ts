import apiClient from './apiClient';
import Cookies from 'js-cookie';

const ReadMeetRequest = async (id: number) => {
  try {
    const response = await apiClient.get(`/gathering/${id}`, {
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

export default ReadMeetRequest;
