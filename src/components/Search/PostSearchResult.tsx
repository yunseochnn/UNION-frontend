import { useEffect, useState, useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { searchKeywordState, boardTypeState } from '../../recoil/searchState';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';
import PostList from '../../common/PostList';

interface Post {
  id: number;
  type: string;
  title: string;
  content: string;
  thumbnail?: string;
  profileImage: string;
  nickname: string;
  university: string;
  likes: number;
  comments: number;
}

export default function PostSearchResult() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const keyword = useRecoilValue(searchKeywordState);
  const boardType = useRecoilValue(boardTypeState);

  const observer = useRef<IntersectionObserver | null>(null);

  // 마지막 게시물을 감지
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/board/search/${boardType}`, {
          params: { keyword, page, size: 10 },
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        });

        const newPosts = response.data.content.map((post: any) => ({
          id: post.id,
          type: post.type,
          title: post.title,
          content: post.contentPreview,
          thumbnail: post.thumbnail,
          profileImage: post.author.profileImage,
          nickname: post.author.nickname,
          university: post.author.univName,
          likes: post.postLikes,
          comments: post.commentCount,
        }));

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setHasMore(response.data.content.length > 0);
      } catch (error) {
        console.error('검색 요청 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword, boardType, page]);

  return (
    <div className="flex-grow overflow-y-auto hidden-scrollbar">
      {isLoading && page === 0 ? (
        <div className="text-center py-4">로딩 중...</div>
      ) : posts.length > 0 ? (
        <PostList posts={posts} lastPostRef={lastPostRef} />
      ) : (
        <p className="text-center mt-4 text-gray-500">검색 결과가 없습니다.</p>
      )}
      {isLoading && page > 0 && <div className="text-center py-4">로딩 중...</div>}
    </div>
  );
}
