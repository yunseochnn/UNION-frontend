import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import Header from '../../components/Board/Header';
import PostList from '../../common/PostList';
import FloatingActionButton from '../../common/FloatingActionButton';

const BOARD_TITLES = {
  free: '자유게시판',
  market: '장터게시판',
  info: '정보게시판',
} as const;

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: keyof typeof BOARD_TITLES }>();

  const posts = [
    {
      profileImage: "/path/to/profile",
      nickname: "닉네임",
      university: "대학교명",
      title: "제목을 입력하세요",
      content: "간단하게 오늘의 내용이 포시됩니다. 아주 간..",
      likes: 155,
      comments: 3,
      thumbnail: "/path/to/image"
    },
    // ... 더 많은 게시글
  ];

  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header title={BOARD_TITLES[type!]} />

      <main className="flex-1 overflow-y-auto px-[20px]">
        <PostList posts={posts} />
      </main>

      <div className="right-8 bottom-24 absolute">
        <FloatingActionButton onClick={() => navigate(`/Board/${type}/write`)} />
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