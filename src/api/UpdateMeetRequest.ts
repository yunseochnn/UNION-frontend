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
  id: number;
}

const UpdateMeetRequest = async ({ info, id }: Prop) => {
  try {
    const response = await apiClient.put(
      `/gathering/${id}`,
      {
        title: info.title,
        content: info.text,
        maxMember: info.maxMember,
        gatheringDateTime: info.selectedDate,
        ...(info.address && { address: info.address }),
        ...(info.latitude && { latitude: info.latitude }),
        ...(info.longitude && { longitude: info.longitude }),
        ...(info.eupMyeonDong && { eupMyeonDong: info.eupMyeonDong }),
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

export default UpdateMeetRequest;
