import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import SideBar from '../common/SideBar';
import PostList from '../common/PostList';
import '../style.css';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';
import { PopularPost, getPopularPosts } from '../api/HomePopularBoard';

interface Post {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
  type: string;
  id: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'posts' | 'meetings'>('posts');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 3,
    totalElements: 0,
    totalPages: 0,
    last: false,
  });

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
  ];

  const fetchPopularPosts = React.useCallback(
    async (page: number = 0) => {
      try {
        setLoading(true);
        const response = await getPopularPosts(page, pageInfo.pageSize);

        setPopularPosts(response.content);
        setPageInfo({
          pageNumber: response.number,
          pageSize: response.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          last: response.last,
        });
      } catch (error) {
        console.error('인기 게시글 로딩 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    },
    [pageInfo.pageSize],
  );

  const getUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/my', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      localStorage.setItem('nickname', response.data.nickname);
    } catch (error) {
      console.error('유저 정보 로딩 중 오류 발생:', error);
      throw error;
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken && refreshToken) {
      Cookies.set('Authorization', `Bearer ${accessToken}`, { path: '/' });
      Cookies.set('Refresh-Token', refreshToken, { path: '/' });
      getUserInfo();
      setIsAuthenticated(true);
    } else if (!Cookies.get('Authorization')) {
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'posts') {
      fetchPopularPosts();
    }
  }, [isAuthenticated, activeTab, fetchPopularPosts]);

  const transformPosts = (posts: PopularPost[]): Post[] => {
    return posts.map(post => ({
      id: post.id,
      profileImage: post.author.profileImage,
      nickname: post.author.nickname,
      university: post.author.univName,
      title: post.title,
      content: post.contentPreview,
      likes: post.postLikes,
      comments: post.commentCount,
      thumbnail: post.thumbnail,
      type: post.type,
    }));
  };

  return (
    <div className="center-content flex flex-col bg-white">
      {isAuthenticated ? (
        <>
          <header className="flex justify-between items-center h-[62px] px-5">
            <img src="/Logo.svg" alt="UNION" className="h-5" />
            <div className="flex">
              <FiBell size={24} onClick={() => navigate('/mynotification')} />
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
            {loading ? (
              <div className="flex justify-center items-center h-32">로딩 중...</div>
            ) : (
              <PostList posts={activeTab === 'posts' ? transformPosts(popularPosts) : meetings} />
            )}
          </main>

          <footer className="h-20 w-full flex justify-center">
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
