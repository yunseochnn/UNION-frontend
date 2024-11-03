import apiClient from './apiClient';
import Cookies from 'js-cookie';

interface ReadBoardRequestParams {
  boardType: string;
  page?: number;
  size?: number;
}

interface Author {
  nickname: string;
  profileImage: string;
  univName: string;
}

interface Post {
  id: number;
  title: string;
  contentPreview: string;
  thumbnail: string;
  createdAt: string;
  author: Author;
  views: number;
  postLikes: number;
  commentCount: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
}

interface BoardListResponse {
  content: Post[];
  pageable: Pageable;
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

export const fetchBoardPosts = async ({
  boardType,
  page = 0,
  size = 3,
}: ReadBoardRequestParams): Promise<BoardListResponse> => {

  const url = `/board/${boardType.toUpperCase()}`; // 소문자 board로 변경, type은 대문자로 변환


  try {
    const response = await apiClient.get<BoardListResponse>(url, {      headers: {
        Authorization: Cookies.get('Authorization'),
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};
