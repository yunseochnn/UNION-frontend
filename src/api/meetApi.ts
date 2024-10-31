import apiClient from './apiClient';

export const meetApi = {
  // 모임 생성
  createMeeting: async (meetingData: any) => {
    return await apiClient.post('/gathering', meetingData);
  },

  // 모임 목록 조회
  getMeetings: async () => {
    return await apiClient.get('/gathering');
  },

  // 모임 상세 조회
  getMeeting: async (id: number) => {
    return await apiClient.get(`/gathering/${id}`);
  },

  // 모임 수정
  updateMeeting: async (id: number, data: any) => {
    return await apiClient.put(`/gathering/${id}`, data);
  },

  // 모임 삭제
  deleteMeeting: async (id: number) => {
    return await apiClient.delete(`/gathering/${id}`);
  },

  // 모임 검색
  searchMeetings: async (keyword: string) => {
    return await apiClient.get(`/gathering/${keyword}`);
  },

  // 모임 좋아요
  toggleLike: async (id: number) => {
    return await apiClient.put(`/gathering/${id}/like`);
  }
};