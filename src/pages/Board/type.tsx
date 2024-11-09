import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import Header from '../../components/Board/Header';
import PostList from '../../common/PostList';
import FloatingActionButton from '../../common/FloatingActionButton';
import { fetchBoardPosts } from '../../api/BoardListRequest';

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

const BOARD_TITLES = {
  FREE: '자유게시판',
  MARKET: '장터게시판',
  INFO: '정보게시판',
  HUMANITIES: '인문사회',
  SCIENCES: '자연과학',
  ENGINEERING: '공학',
  ARTS: '예체능',
  MEDICINE: '의학',
} as const;

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

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
    const fetchPosts = async () => {
      if (!type) return;
      try {
        setIsLoading(true);
        const response = await fetchBoardPosts({ boardType: type, page });
        setPosts(prevPosts => [...prevPosts, ...response]); // 기존 포스트에 새 데이터 추가
        setHasMore(response.length > 0); // 데이터가 있으면 hasMore를 true로 설정
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [type, page]);

  if (!type || !BOARD_TITLES[type as keyof typeof BOARD_TITLES]) return null;

  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header title={BOARD_TITLES[type as keyof typeof BOARD_TITLES]} boardType={type} />
      <main className="overflow-y-auto hidden-scrollbar flex-1">
        <PostList posts={posts} lastPostRef={lastPostRef} />
        {isLoading && <div>로딩 중...</div>}
      </main>
      <div className="right-8 bottom-24 absolute">
        <FloatingActionButton onClick={() => navigate(`/Board/write/${type}`)} />
      </div>
      <footer className="h-20 flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default BoardList;
