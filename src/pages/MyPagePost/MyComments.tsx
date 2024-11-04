import { useEffect, useState, useRef, useCallback } from 'react';
import MyPageList from '../../pages/MyPageList';

import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';

interface Post {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail: string;
  type: string;
  id: number;
}

export default function MyComments() {
  const [comments, setComments] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get('/user/my/comments', {
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
          params: { page, size },
        });

        const fetchedComments = response.data.content.map((item: any) => ({
          profileImage: item.author.profileImage,
          nickname: item.author.nickname,
          university: item.author.univName,
          title: item.title,
          content: item.contentPreview,
          likes: item.postLikes,
          comments: item.commentCount,
          thumbnail: item.thumbnail,
          type: item.type,
        }));

        setComments(prevComments => [...prevComments, ...fetchedComments]);
        setHasMore(response.data.content.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error('댓글 단 글 불러오기 실패:', error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [page, size]);

  return (
    <div>
      <MyPageList posts={comments} pageTitle="내가 댓글 단 글" lastPostRef={lastCommentRef} />
      {isLoading && <p></p>}
    </div>
  );
}
