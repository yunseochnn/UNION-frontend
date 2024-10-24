import React from 'react';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../common/SideBar';
import Header from '../../components/Board/Header';
import FloatingActionButton from '../../common/FloatingActionButton'; // FloatingActionButton 컴포넌트 import

interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    affiliation: string;
  };
  likes: number;
  comments: number;
  thumbnail?: string;
}

const BOARD_TITLES = {
  free: '자유게시판',
  market: '장터게시판',
  info: '정보게시판',
} as const;

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: keyof typeof BOARD_TITLES }>();

  const posts: BoardPost[] = [
    {
      id: 1,
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      author: {
        name: '닉네임',
        affiliation: '대학교명',
      },
      likes: 155,
      comments: 3,
      thumbnail: 'path/to/image',
    },
    // ... 더 많은 게시글 추가
  ];

  return (
    <div className="center-content flex flex-col bg-white relative">
      <Header title={BOARD_TITLES[type!]} />

      <main className="flex-1 overflow-y-auto px-[20px]">
        {posts.map(post => (
          <div key={post.id} className="py-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <span>·</span>
                  <span>{post.author.affiliation}</span>
                </div>
                <h2 className="font-bold mt-1">{post.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{post.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiHeart />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiMessageSquare />
                    <span>{post.comments}</span>
                  </span>
                </div>
              </div>
              {post.thumbnail && <div className="w-20 h-20 bg-gray-200 rounded-md" />}
            </div>
          </div>
        ))}
      </main>

      {/* FloatingActionButton을 오른쪽 하단에 고정 */}
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
