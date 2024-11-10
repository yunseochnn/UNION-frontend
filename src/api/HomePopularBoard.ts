import apiClient from './apiClient';
import Cookies from 'js-cookie';

export interface PopularPost {
  id: number;
  type: string;
  title: string;
  contentPreview: string;
  thumbnail: string;
  createdAt: string;
  author: {
    nickname: string;
    profileImage: string;
    univName: string;
  };
  views: number;
  postLikes: number;
  commentCount: number;
}

export interface PopularPostResponse {
  content: PopularPost[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export const getPopularPosts = async (page: number = 0, size: number = 3): Promise<PopularPostResponse> => {
  try {
    const response = await apiClient.get(`/board/home?page=${page}&size=${size}`, {
      headers: {
        Authorization: Cookies.get('Authorization'),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('인기 게시글 로딩 중 오류 발생:', error);
    throw error;
  }
};
