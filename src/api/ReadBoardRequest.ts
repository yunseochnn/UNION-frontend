import apiClient from './apiClient';

const ReadBoardRequest = async (type: string, id: number) => {
  try {
    const response = await apiClient.get(`/board/${type}/${id}`, {
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

export default ReadBoardRequest;
