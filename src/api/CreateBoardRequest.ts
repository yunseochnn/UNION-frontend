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
