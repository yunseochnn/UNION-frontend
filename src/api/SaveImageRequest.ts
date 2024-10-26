import apiClient from './apiClient';

const SaveImageRequest = async (id: number, targetType: string, urls: string[]) => {
  try {
    const response = await apiClient.post(
      '/photo/save',
      {
        targetId: id,
        targetType: targetType,
        urls: urls,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU0MSwiZXhwIjoxNzMyNDMxNTQxLCJzdWIiOiJ0b2tlbjEifQ.ObKaKc37PY7NcO6ZRjw44pSu8xlvr4Oq_TdY_ySQJB4',
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SaveImageRequest;
