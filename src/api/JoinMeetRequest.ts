import apiClient from './apiClient';

const JoinMeetRequest = async (gatheringId: number) => {
  try {
    const response = await apiClient.post(
      `/gathering/${gatheringId}/participants`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU2MywiZXhwIjoxNzMyNDMxNTYzLCJzdWIiOiJ0b2tlbjMifQ.8ctvdQIhSoLiN7MEjY09OrrLza936CK62q9LMjlW6-I',
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
