import apiClient from './apiClient';

const ReadMeetRequest = async (id: number) => {
  try {
    const response = await apiClient.get(`/gathering/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default ReadMeetRequest;
