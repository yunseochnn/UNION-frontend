import apiClient from './apiClient';

interface info {
  type: string;
  title: string;
  content: string;
  thumbnail: string;
}

interface Prop {
  info: info;
}

const CreateBoardRequest = async ({ info }: Prop) => {
  try {
    const response = await apiClient.post(
      `/board/${info.type}`,
      {
        title: info.title,
        content: info.content,
        thumbnail: info.thumbnail,
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

export default CreateBoardRequest;
