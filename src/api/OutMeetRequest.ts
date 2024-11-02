import apiClient from './apiClient';
import Cookies from 'js-cookie';

const OutMeetRequest = async (gatheringId: number) => {
  try {
    const response = await apiClient.delete(`/gathering/${gatheringId}/exit`, {
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

export default OutMeetRequest;
