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
  type: string;
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

export const fetchBoardPosts = async ({ boardType, page = 0, size = 3 }: ReadBoardRequestParams): Promise<Post[]> => {
  const url = `/board/${boardType.toUpperCase()}`;

  try {
    const response = await apiClient.get<BoardListResponse>(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get('Authorization')}`,
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    });

    return response.data.content;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};
