import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import Header from '../../components/Board/Header';
import PostList from '../../common/PostList';
import FloatingActionButton from '../../common/FloatingActionButton';
import { boardApi } from '../../api/boardApi';

const BOARD_TITLES = {
  free: '자유게시판',
  market: '장터게시판',
  info: '정보게시판',
} as const;

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!type) return;
      try {
        const response = await boardApi.getPosts(type);
        setPosts(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    fetchPosts();
  }, [type]);

  // `handleSearch` 함수 제거

  if (!type || !BOARD_TITLES[type as keyof typeof BOARD_TITLES]) return null;

  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header 
        title={BOARD_TITLES[type as keyof typeof BOARD_TITLES]}
      />

      <main className="flex-1 overflow-y-auto px-[20px]">
        <PostList posts={posts} />
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
