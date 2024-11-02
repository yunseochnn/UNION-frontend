import apiClient from './apiClient';
import Cookies from 'js-cookie';

export interface Meeting {
  id: number;
  title: string;
  maxMember: number;
  currentMember: number;
  eupMyeonDong: string | null;
  gatheringDateTime: string;
  views: number;
}

export const ReadMeetListRequest = {
  getMeetList: async (
    sortType: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE' = 'LATEST',
    latitude: number = 37.556016,
    longitude: number = 126.972355,
    page: number = 0,
    size: number = 3,
  ) => {
    return await apiClient.get('/gathering', {
      params: {
        sortType,
        latitude,
        longitude,
        page,
        size,
      },
      headers: {
        Authorization: Cookies.get('Authorization'),
        'Content-Type': 'application/json',
      },
    });
  },
};
