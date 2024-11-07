import apiClient from './apiClient';
import Cookies from 'js-cookie';

const OutMeetRequest = async (gatheringId: number) => {
  try {
    const response = await apiClient.delete(`/gatherings/${gatheringId}/exit`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('Authorization'),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default OutMeetRequest;
