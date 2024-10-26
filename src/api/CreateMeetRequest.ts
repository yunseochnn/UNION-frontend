import apiClient from './apiClient';

interface Info {
  title: string;
  text: string;
  maxMember: number;
  selectedDate: string;
  address?: string;
  latitude?: number;
  longitude?: number;
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
        currentMember: 1,
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

export default CreateMeetRequest;
