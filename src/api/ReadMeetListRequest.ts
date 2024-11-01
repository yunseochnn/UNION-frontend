import apiClient from './apiClient';
import Cookies from 'js-cookie';

export const ReadMeetListRequest = {
 getMeetList: async () => {
   return await apiClient.get('/meet', {
     headers: {
       Authorization: `Bearer ${Cookies.get('Authorization')}`,
       'Content-Type': 'application/json',
     }
   });
 }
};