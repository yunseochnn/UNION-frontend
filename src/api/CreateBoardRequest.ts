import apiClient from './apiClient';
import Cookies from 'js-cookie';

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

export default CreateBoardRequest;
