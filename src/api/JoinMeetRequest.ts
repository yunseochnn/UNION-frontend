import apiClient from './apiClient';
import Cookies from 'js-cookie';

const JoinMeetRequest = async (gatheringId: number) => {
  try {
    const response = await apiClient.post(
      `/gatherings/${gatheringId}/participants`,
      {},
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

export default JoinMeetRequest;
