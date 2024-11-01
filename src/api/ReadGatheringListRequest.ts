import apiClient from './apiClient';

export const ReadGatheringListRequest = {
  getGatheringList: async () => {
    return await apiClient.get('/gathering');
  }
};