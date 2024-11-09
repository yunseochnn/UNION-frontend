import axios, { AxiosError } from 'axios';

// 에러 응답 타입 정의
interface ApiError {
  code: string;
  message: string;
  status: number;
}

// 요청 파라미터 타입 정의
interface PostCommentNotificationParams {
  type_id: number;
  comment_id: number;
}

interface GatheringNotificationParams {
  type_id: number;
}

// 알림 항목 응답 타입 정의
export interface NotificationItem {
  id: number;
  type: 'post' | 'gathering' | 'comment';
  nickname: string;
  title: string;
  content: string | null;
  createdAt: string;
  isRead: boolean;
  typeId: string;
}

// 알림 생성 응답 타입
interface NotificationCreateResponse {
  id: number;
  createdAt: string;
  isRead: boolean;
}

// 알림 목록 조회 응답 타입
interface NotificationResponse {
  notifications: NotificationItem[];
}

// 공통으로 사용할 헤더 설정 함수
const getHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

// 에러 처리 함수
const handleApiError = (error: AxiosError<ApiError>) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        throw new Error('잘못된 요청입니다.');
      case 403:
        throw new Error('권한이 없습니다.');
      case 404:
        throw new Error('찾을 수 없는 리소스입니다.');
      default:
        throw new Error('서버 오류가 발생했습니다.');
    }
  }
  throw error;
};

// notification 관련 API 모음
export const notificationApi = {
  // 게시글 알림 생성
  createPostNotification: async (params: PostCommentNotificationParams) => {
    try {
      const response = await axios.post<NotificationCreateResponse>(
        '/notification/post',
        params,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiError>);
    }
  },

  // 댓글 알림 생성
  createCommentNotification: async (params: PostCommentNotificationParams) => {
    try {
      const response = await axios.post<NotificationCreateResponse>(
        '/notification/comment',
        params,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiError>);
    }
  },

  // 모임 알림 생성
  createGatheringNotification: async (params: GatheringNotificationParams) => {
    try {
      const response = await axios.post<NotificationCreateResponse>(
        '/notification/gathering',
        params,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiError>);
    }
  },

  // 알림 목록 조회
  getNotifications: async (page: number, size: number) => {
    try {
      if (size > 20) {
        throw new Error('size는 20을 초과할 수 없습니다.');
      }
      
      const response = await axios.get<NotificationResponse>(
        `/notification/${page}/${size}`,
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiError>);
      return { notifications: [] };
    }
  },

  // 알림 읽음 처리
  markAsRead: async (page: number, size: number) => {
    try {
      if (size > 20) {
        throw new Error('size는 20을 초과할 수 없습니다.');
      }
      
      await axios.post(
        `/notification/read/${page}/${size}`,
        {},
        { headers: getHeaders() }
      );
      
      return true;
    } catch (error) {
      handleApiError(error as AxiosError<ApiError>);
      return false;
    }
  }
};