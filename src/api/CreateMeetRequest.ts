import apiClient from './apiClient';

interface Info {
  title: string;
  text: string;
  maxMember: number;
  selectedDate: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  eupMyeonDong?: string;
}

interface Prop {
  info: Info;
}

const CreateMeetRequest = async ({ info }: Prop) => {
  console.log(info);
  try {
    const response = await apiClient.post(
      '/gathering',
      {
        title: info.title,
        content: info.text,
        maxMember: info.maxMember,
        gatheringDateTime: info.selectedDate,
        ...(info.address && { address: info.address }),
        ...(info.latitude && { latitude: info.latitude }),
        ...(info.longitude && { longitude: info.longitude }),
        ...(info.eupMyeonDong && { eupMyeonDong: info.eupMyeonDong }),
        currentMember: 1,
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

export default CreateMeetRequest;
