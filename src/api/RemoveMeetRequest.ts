import apiClient from './apiClient';

const RemoveMeetRequest = async (id: number) => {
  try {
    const response = await apiClient.delete(`/gathering/${id}`, {
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

export default RemoveMeetRequest;
