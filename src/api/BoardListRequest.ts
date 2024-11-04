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

interface BoardPost {
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
  content: BoardPost[];
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

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  profileImage: string;
  nickname: string;
  university: string;
  likes: number;
  comments: number;
  type: string;
}

export const fetchBoardPosts = async ({ boardType, page = 0, size = 3 }: ReadBoardRequestParams): Promise<Post[]> => {
  const url = `/board/${boardType.toUpperCase()}`;

  try {
    const response = await apiClient.get<BoardListResponse>(url, {
      headers: {
        Authorization: Cookies.get('Authorization'),
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    });

    // BoardPost[]를 Post[]로 매핑
    return response.data.content.map(post => ({
      id: post.id,
      title: post.title,
      content: post.contentPreview, // `contentPreview`를 `content`로 매핑
      thumbnail: post.thumbnail,
      profileImage: post.author.profileImage,
      nickname: post.author.nickname,
      university: post.author.univName,
      likes: post.postLikes,
      comments: post.commentCount,
      type: post.type,
    }));
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};
