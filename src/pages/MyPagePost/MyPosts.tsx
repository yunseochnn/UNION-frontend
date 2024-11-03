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
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
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
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/user/my/posts`, {
          params: { page, size },
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        });

        const fetchedPosts = response.data.content.map((post: any) => ({
          profileImage: post.author.profileImage,
          nickname: post.author.nickname,
          university: post.author.univName,
          title: post.title,
          content: post.contentPreview,
          likes: post.postLikes,
          comments: post.commentCount,
          thumbnail: post.thumbnail,
        }));

        setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
        setHasMore(response.data.content.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error('내 게시물 불러오기 실패:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page, size]);

  return (
    <div>
      <MyPageList posts={posts} pageTitle="내가 작성한 게시물" lastPostRef={lastPostRef} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
