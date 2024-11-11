import apiClient from './apiClient';
import Cookies from 'js-cookie';

interface Info {
  title: string;
  text: string;
  maxMember: number;
  selectedDate: string;
  thumbnail: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  eupMyeonDong?: string;
}

interface Prop {
  info: Info;
}

const CreateMeetRequest = async ({ info }: Prop) => {
  try {
    const response = await apiClient.post(
      '/gatherings',
      {
        title: info.title,
        content: info.text,
        maxMember: info.maxMember,
        gatheringDateTime: info.selectedDate,
        thumbnail: info.thumbnail,
        ...(info.address && { address: info.address }),
        ...(info.latitude && { latitude: info.latitude }),
        ...(info.longitude && { longitude: info.longitude }),
        ...(info.eupMyeonDong && { eupMyeonDong: info.eupMyeonDong }),
        currentMember: 1,
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

export default CreateMeetRequest;
