// HomePopularMeetings.ts
import apiClient from './apiClient';
import Cookies from 'js-cookie';

export interface Author {
  token: string;
  nickname: string;
  profileImage: string;
  univName: string;
}

export interface PopularMeeting {
  id: number;
  title: string;
  content: string;
  maxMember: number;
  currentMember: number;
  eupMyeonDong: string;
  gatheringDateTime: string;
  views: number;
  latitude: number;
  longitude: number;
  author: Author;
  thumbnail: string;
  likes: number;
}

export interface PopularMeetingResponse {
  content: PopularMeeting[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}

export const getPopularMeetings = async (page: number = 0, size: number = 5): Promise<PopularMeetingResponse> => {
  const response = await apiClient.get(`/gatherings/hot?page=${page}&size=${size}`, {
    headers: {
      Authorization: Cookies.get('Authorization'),
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
