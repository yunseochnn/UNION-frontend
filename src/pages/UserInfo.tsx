import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';
import PostList from '../common/PostList';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface UserInfoType {
  token: string;
  nickname: string;
  description: string;
  univName: string;
  profileImage: string;
  isBlocked: boolean;
}

interface PostType {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail: string;
}

export default function UserInfo() {
  const navigate = useNavigate();
  const recoilUserToken = useRecoilValue(selectedUserState);
  const userToken = recoilUserToken || localStorage.getItem('userToken') || '';

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<PostType[]>([]);
  const [meetings, setMeetings] = useState<PostType[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);
  const [activeTab, setActiveTab] = useState('posts');

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 유저 정보 가져오기
  const fetchUserInfo = useCallback(async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get(`/user/${userToken}`, {
        headers: { Authorization: Cookies.get('Authorization') },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('유저 정보 불러오기 실패:', error);
    }
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
      fetchUserInfo();
    }
  }, [userToken, fetchUserInfo]);

  // 게시물 가져오기
  const fetchPosts = useCallback(async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get(`/user/${userToken}/posts`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
        params: { page: 0, size: 10 },
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
      setPosts(fetchedPosts);
      setPostCount(response.data.totalElements);
    } catch (error) {
      console.error('게시물 목록 불러오기 실패:', error);
    }
  }, [userToken]);

  // 댓글 가져오기
  const fetchComments = useCallback(async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get(`/user/${userToken}/comments`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
        params: { page: 0, size: 10 },
      });
      const fetchedComments = response.data.content.map((comment: any) => ({
        profileImage: comment.author.profileImage,
        nickname: comment.author.nickname,
        university: comment.author.univName,
        title: comment.title,
        content: comment.contentPreview,
        likes: comment.postLikes,
        comments: comment.commentCount,
        thumbnail: comment.thumbnail,
      }));
      setComments(fetchedComments);
      setCommentCount(response.data.totalElements);
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  }, [userToken]);

  // 모임글 가져오기
  const fetchMeetings = useCallback(async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get(`/gatherings/user/${userToken}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
        params: { page: 0, size: 10 },
      });
      const fetchedMeetings = response.data.content.map((meeting: any) => ({
        profileImage: meeting.author.profileImage,
        nickname: meeting.author.nickname,
        university: meeting.author.univName,
        title: meeting.title,
        content: meeting.contentPreview,
        likes: meeting.postLikes,
        comments: meeting.commentCount,
        thumbnail: meeting.thumbnail,
      }));
      setMeetings(fetchedMeetings);
      setMeetingCount(response.data.totalElements);
    } catch (error) {
      console.error('모임글 목록 불러오기 실패:', error);
    }
  }, [userToken]);

  useEffect(() => {
    if (activeTab === 'posts') fetchPosts();
    if (activeTab === 'comments') fetchComments();
    if (activeTab === 'meetings') fetchMeetings();
  }, [activeTab, fetchPosts, fetchComments, fetchMeetings]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBlockToggle = async () => {
    if (!userInfo) return;

    try {
      if (userInfo.isBlocked) {
        console.log('차단 해제 요청 중:', userInfo.token);
        const response = await apiClient.delete(`/user/block/${userInfo.token}`, {
          headers: { Authorization: Cookies.get('Authorization') },
        });
        console.log('차단 해제 응답:', response);
      } else {
        console.log('차단 요청 중:', userInfo.token);
        const response = await apiClient.post(
          `/user/block/${userInfo.token}`,
          {},
          {
            headers: { Authorization: Cookies.get('Authorization') },
          },
        );
        console.log('차단 요청 응답:', response);
      }
      setUserInfo(prevInfo => {
        const updatedUserInfo = { ...prevInfo!, isBlocked: !prevInfo!.isBlocked };
        console.log('업데이트된 userInfo:', updatedUserInfo);
        return updatedUserInfo;
      });
    } catch (error) {
      console.error('차단/차단 해제 실패:', error);
    }
  };

  if (!userInfo) return <div>유저 정보를 불러오는 중입니다...</div>;

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="유저 정보" onBack={handleBack} />
      <div className="px-[36px]">
        <User
          name={userInfo.nickname}
          university={userInfo.univName}
          bio={userInfo.description}
          profileImage={userInfo.profileImage}
          buttonLabel={userInfo.isBlocked ? '차단 해제' : '차단 하기'}
          buttonWidth="84px"
          onButtonClick={handleBlockToggle}
        />
      </div>
      <UserTabs
        onTabChange={handleTabChange}
        postCount={postCount}
        commentCount={commentCount}
        meetingCount={meetingCount}
      />
      <div className="mt-5 px-[36px]">
        {activeTab === 'posts' && <PostList posts={posts} />}
        {activeTab === 'comments' && <PostList posts={comments} />}
        {activeTab === 'meetings' && <PostList posts={meetings} />}
      </div>
    </div>
  );
}
