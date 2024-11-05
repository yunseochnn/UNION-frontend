import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell } from 'react-icons/fi';
import SideBar from '../common/SideBar';
import PostList from '../common/PostList';
import '../style.css';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'posts' | 'meetings'>('posts');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //유저 상세정보
  const getUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/my', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      console.log(response.data);
      const data = response.data;
      localStorage.setItem('nickname', data.nickname);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('nickname')) {
      getUserInfo();
    }
  }, []);

  const posts: Post[] = [
    {
      profileImage: '/path/to/profile',
      nickname: '닉네임',
      university: '대학교명',
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
    {
      profileImage: '/path/to/profile',
      nickname: '닉네임',
      university: '대학교명',
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
    {
      profileImage: '/path/to/profile',
      nickname: '닉네임',
      university: '대학교명',
      title: '제목을 입력하세요',
      content: '간단하게 오늘의 내용이 포시됩니다. 아주 간..',
      likes: 155,
      comments: 3,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
  ];

  const meetings: Post[] = [
    {
      profileImage: '/path/to/profile',
      nickname: '모임장',
      university: '서울대학교',
      title: '코딩 스터디 모집합니다',
      content: '매주 토요일 2시간씩 모각코 진행합니다...',
      likes: 89,
      comments: 12,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
    {
      profileImage: '/path/to/profile',
      nickname: '스터디장',
      university: '연세대학교',
      title: '알고리즘 스터디원 모집',
      content: '매주 화요일 저녁 8시에 모임을 가집니다...',
      likes: 76,
      comments: 8,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
    {
      profileImage: '/path/to/profile',
      nickname: '프로젝트장',
      university: '고려대학교',
      title: '사이드 프로젝트 팀원 모집',
      content: '6개월간 진행할 웹 프로젝트 팀원을 모집합니다...',
      likes: 122,
      comments: 15,
      thumbnail: '/path/to/image',
      type: 'FREE',
      id: 2,
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken && refreshToken) {
      Cookies.set('Authorization', `Bearer ${accessToken}`, { path: '/' });
      Cookies.set('Refresh-Token', refreshToken, { path: '/' });
      setIsAuthenticated(true);
    } else if (!Cookies.get('Authorization')) {
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [location, navigate]);

  return (
    <div className="center-content flex flex-col bg-white pt-1">
      {isAuthenticated ? (
        <>
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

          <main className="flex-1 overflow-y-auto hidden-scrollbar">
            <div onClick={() => navigate(activeTab === 'posts' ? '/boarddetail' : '/meetdetail')}>
              <PostList posts={activeTab === 'posts' ? posts : meetings} />
            </div>
          </main>

          <footer className="h-14 w-full flex justify-center">
            <div className="w-[90%]">
              <SideBar />
            </div>
          </footer>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
