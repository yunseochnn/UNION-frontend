import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import SideBar from '../common/SideBar';
import PostList from '../common/PostList';
import '../style.css';
import Cookies from 'js-cookie';
import { PopularPost, getPopularPosts } from '../api/HomePopularBoard';
import { PopularMeeting, getPopularMeetings } from '../api/HomePopularMeetings';
import Slide from '../common/Slide';
import MeetPostList from '../common/MeetPostList';
import apiClient from '../api/apiClient';
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
  const [popularMeetings, setPopularMeetings] = useState<PopularMeeting[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [postPage, setPostPage] = useState(0);
  const [meetingPage, setMeetingPage] = useState(0);
  const [postHasMore, setPostHasMore] = useState(true);
  const [meetingHasMore, setMeetingHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const postObserver = useRef<IntersectionObserver | null>(null);
  const meetingObserver = useRef<IntersectionObserver | null>(null);

  const banner = [
    'https://union-image-bucket.s3.ap-northeast-2.amazonaws.com/banner/carrot_banner.png',
    'https://union-image-bucket.s3.ap-northeast-2.amazonaws.com/banner/jab_banner.png',
    'https://union-image-bucket.s3.ap-northeast-2.amazonaws.com/banner/naver_banner.png',
  ];
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
  const fetchPopularPosts = async () => {
    setPostLoading(true);
    try {
      const response = await getPopularPosts(postPage, 5);
      setPopularPosts(prevPosts => [...prevPosts, ...response.content]);
      setPostHasMore(response.content.length > 0);
    } catch (error) {
      console.error('인기 게시글 로딩 중 오류 발생:', error);
    } finally {
      setPostLoading(false);
    }
  };

  const fetchPopularMeetings = async () => {
    setMeetingLoading(true);
    try {
      const response = await getPopularMeetings(meetingPage, 5);
      setPopularMeetings(prevMeetings => [...prevMeetings, ...response.content]);
      setMeetingHasMore(response.content.length > 0);
    } catch (error) {
      console.error('인기 모임 로딩 중 오류 발생:', error);
    } finally {
      setMeetingLoading(false);
    }
  };

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (postLoading || !postHasMore) return;
      if (postObserver.current) postObserver.current.disconnect();

      postObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && postHasMore) {
          setPostPage(prevPage => prevPage + 1);
        }
      });

      if (node) postObserver.current.observe(node);
    },
    [postLoading, postHasMore],
  );

  const lastMeetingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (meetingLoading || !meetingHasMore) return;
      if (meetingObserver.current) meetingObserver.current.disconnect();

      meetingObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && meetingHasMore) {
          setMeetingPage(prevPage => prevPage + 1);
        }
      });

      if (node) meetingObserver.current.observe(node);
    },
    [meetingLoading, meetingHasMore],
  );

  const getUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/my', {
        headers: { Authorization: Cookies.get('Authorization') },
      });
      localStorage.setItem('nickname', response.data.nickname);
    } catch (error) {
      console.error('유저 정보 로딩 중 오류 발생:', error);
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

  // 데이터가 로드될 때마다 이전 스크롤 위치 유지
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [popularPosts, popularMeetings]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'posts') {
      fetchPopularPosts();
    } else if (isAuthenticated && activeTab === 'meetings') {
      fetchPopularMeetings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, activeTab, postPage, meetingPage]);

  return (
    <div className="center-content flex flex-col bg-white" ref={scrollRef}>
      {isAuthenticated ? (
        <>
          <header className="flex justify-between items-center h-[62px] px-5">
            <img src="/Logo.svg" alt="UNION" className="h-5" />
            <button>
              <FiBell size={24} onClick={() => navigate('/mynotification')} />
            </button>
          </header>

          <div className="w-full aspect-video flex items-center justify-center mb-6">
            <Slide images={banner} />
          </div>

          <div className="flex px-8">
            <div className="flex w-full bg-gray-100 rounded-full relative">
              <button
                className={`flex-1 py-2 -mr-4 ${activeTab === 'posts' ? 'bg-red-500 text-white rounded-full z-10' : 'text-gray-600'}`}
                onClick={() => setActiveTab('posts')}
              >
                인기 게시글
              </button>
              <button
                className={`flex-1 py-2 -ml-4 ${activeTab === 'meetings' ? 'bg-red-500 text-white rounded-full z-10' : 'text-gray-600'}`}
                onClick={() => setActiveTab('meetings')}
              >
                인기 모임
              </button>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto hidden-scrollbar">
            {(postLoading && postPage === 0) || (meetingLoading && meetingPage === 0) ? (
              <div className="flex justify-center items-center h-32">로딩 중...</div>
            ) : activeTab === 'posts' ? (
              <PostList posts={transformPosts(popularPosts)} lastPostRef={lastPostRef} />
            ) : (
              <MeetPostList meetings={popularMeetings} lastMeetingRef={lastMeetingRef} />
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
