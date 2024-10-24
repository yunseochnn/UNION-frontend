import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell } from 'react-icons/fi';
import SideBar from '../common/SideBar';
import '../style.css';

interface Post {
  id: number;
  author: {
    name: string;
    affiliation: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
}

interface Meeting {
  id: number;
  author: {
    name: string;
    affiliation: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'meetings'>('posts');

  const posts: Post[] = [
    {
      id: 1,
      author: { name: '닉네임', affiliation: '대학교명' },
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
    },
    {
      id: 2,
      author: { name: '닉네임', affiliation: '대학교명' },
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
    },
    {
      id: 3,
      author: { name: '닉네임', affiliation: '대학교명' },
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
    },
  ];

  const meetings: Meeting[] = [
    {
      id: 1,
      author: { name: '모임장', affiliation: '서울대학교' },
      title: '코딩 스터디 모집합니다',
      content: '매주 토요일 2시간씩 모각코 진행합니다...',
      likes: 89,
      comments: 12,
      thumbnail: '/path/to/image',
    },
    {
      id: 2,
      author: { name: '스터디장', affiliation: '연세대학교' },
      title: '알고리즘 스터디원 모집',
      content: '매주 화요일 저녁 8시에 모임을 가집니다...',
      likes: 76,
      comments: 8,
      thumbnail: '/path/to/image',
    },
    {
      id: 3,
      author: { name: '프로젝트장', affiliation: '고려대학교' },
      title: '사이드 프로젝트 팀원 모집',
      content: '6개월간 진행할 웹 프로젝트 팀원을 모집합니다...',
      likes: 122,
      comments: 15,
      thumbnail: '/path/to/image',
    },
  ];

  const renderItem = (item: Post | Meeting) => {
    const handleItemClick = () => {
      if (activeTab === 'posts') {
        navigate(`/boarddetail/${item.id}`);
      } else {
        navigate(`/meetdetail/${item.id}`);
      }
    };

    return (
      <div key={item.id} className="border-b cursor-pointer hover:bg-gray-50" onClick={handleItemClick}>
        <div className="flex items-start gap-4 py-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="text-sm text-gray-600">
                <span>{item.author.name}</span>
                <span> · </span>
                <span>{item.author.affiliation}</span>
              </div>
            </div>
            <h3 className="font-bold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.content}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>❤️ {item.likes}</span>
              <span>💬 {item.comments}</span>
            </div>
          </div>
          {item.thumbnail && <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0" />}
        </div>
      </div>
    );
  };

  return (
    <div className="center-content flex flex-col bg-white pt-1">
      <header className="flex justify-between items-center p-4">
        <img src="/Logo.svg" alt="UNION" className="h-8" />
        <div className="flex space-x-4">
          <FiSearch size={24} />
          <FiBell size={24} />
        </div>
      </header>

      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-white" />
      </div>

      <div className="flex px-8">
        <div className="flex w-full bg-gray-100 rounded-full relative">
          <button
            className={`flex-1 py-2 -mr-4 ${
              activeTab === 'posts' ? 'bg-red-500 text-white rounded-full z-10' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            인기 게시글
          </button>
          <button
            className={`flex-1 py-2 -ml-4 ${
              activeTab === 'meetings' ? 'bg-red-500 text-white rounded-full z-10' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('meetings')}
          >
            인기 모임
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto hidden-scrollbar px-[20px]">
        {activeTab === 'posts' ? posts.map(renderItem) : meetings.map(renderItem)}
      </main>

      <footer className="h-14 w-full flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Home;
