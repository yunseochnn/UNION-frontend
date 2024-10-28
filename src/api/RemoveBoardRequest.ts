import apiClient from './apiClient';

const RemoveBoardRequest = async (type: string, id: number) => {
  try {
    const response = await apiClient.delete(`/board/${type}/${id}`, {
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

export default RemoveBoardRequest;
