// src/pages/Board/type.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import Header from '../../components/Board/Header';
import PostList from '../../common/PostList';
import FloatingActionButton from '../../common/FloatingActionButton';
import { fetchBoardPosts } from '../../api/BoardListRequest';

const BOARD_TITLES = {
  FREE: '자유게시판',
  MARKET: '장터게시판',
  INFO: '정보게시판',
  HUMANITIES: '인문사회',
  SCIENCES: '자연과학',
  ENGINEERING: '공학',
  ARTS: '예체능',
  MEDICINE: '의학',
  EMPLOYMENT: '추후 생각',
} as const;

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [posts, setPosts] = useState<any[]>([]); // 빈 배열로 초기화
  const [isLoading, setIsLoading] = useState(true);
  const page = 0;
  const size = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!type) return;
      try {
        setIsLoading(true);
        const response = await fetchBoardPosts({
          boardType: type,
          page,
          size,
        });
        setPosts(response.content || []); // response.content가 undefined일 경우 빈 배열 사용
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        setPosts([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [type]);

  if (!type || !BOARD_TITLES[type as keyof typeof BOARD_TITLES]) return null;

  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header title={BOARD_TITLES[type as keyof typeof BOARD_TITLES]} />
      <main className="flex-1 overflow-y-auto ">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <PostList posts={posts || []} /> // posts가 undefined일 경우 빈 배열 전달
        )}
      </main>
      <div className="right-8 bottom-24 absolute">
        <FloatingActionButton onClick={() => navigate(`/Board/write/${type}`)} />
      </div>
      <footer className="h-14 flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default BoardList;
