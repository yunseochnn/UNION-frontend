import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';
import PostList from '../common/PostList';
import MeetPostList from '../common/MeetPostList';
import Cookies from 'js-cookie';

interface UserInfoType {
  token: string;
  nickname: string;
  description: string;
  univName: string;
  profileImage: string;
  blocked: boolean;
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
  type: string;
  id: number;
}

interface MeetingType {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  maxMember: number;
  currentMember: number;
  eupMyeonDong: string;
  gatheringDateTime: string;
  views: number;
  thumbnail: string;
  id: number;
}

export default function UserInfo() {
  const recoilUserToken = useRecoilValue(selectedUserState);
  const userToken = recoilUserToken || localStorage.getItem('userToken') || '';

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<PostType[]>([]);
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);
  const [activeTab, setActiveTab] = useState('posts');

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
      setPosts(
        response.data.content.map((post: any) => ({
          id: post.id,
          type: post.type,
          profileImage: post.author.profileImage,
          nickname: post.author.nickname,
          university: post.author.univName,
          title: post.title,
          content: post.contentPreview,
          likes: post.postLikes,
          comments: post.commentCount,
          thumbnail: post.thumbnail,
        })),
      );
      setPostCount(response.data.totalElements);
    } catch (error) {
      console.error('게시물 목록 불러오기 실패:', error);
    }
  }, [userToken]);

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
      setComments(
        response.data.content.map((comment: any) => ({
          profileImage: comment.author.profileImage,
          nickname: comment.author.nickname,
          university: comment.author.univName,
          title: comment.title,
          content: comment.contentPreview,
          likes: comment.postLikes,
          comments: comment.commentCount,
          thumbnail: comment.thumbnail,
        })),
      );
      setCommentCount(response.data.totalElements);
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  }, [userToken]);

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
      setMeetings(
        response.data.content.map((meeting: any) => ({
          id: meeting.id,
          title: meeting.title,
          profileImage: meeting.author.profileImage,
          nickname: meeting.author.nickname,
          university: meeting.author.univName,
          maxMember: meeting.maxMember,
          currentMember: meeting.currentMember,
          eupMyeonDong: meeting.eupMyeonDong,
          gatheringDateTime: meeting.gatheringDateTime,
          views: meeting.views,
          thumbnail: meeting.thumbnail,
        })),
      );
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
      const updatedBlocked = !userInfo.blocked;
      if (updatedBlocked) {
        await apiClient.post(
          `/user/block/${userInfo.token}`,
          {},
          {
            headers: { Authorization: Cookies.get('Authorization') },
          },
        );
      } else {
        await apiClient.delete(`/user/block/${userInfo.token}`, {
          headers: { Authorization: Cookies.get('Authorization') },
        });
      }
      setUserInfo(prevInfo => ({ ...prevInfo!, blocked: updatedBlocked }));
    } catch (error) {
      console.error('차단/차단 해제 실패:', error);
    }
  };

  if (!userInfo) return <div></div>;

  return (
    <div className="h-screen flex flex-col">
      <Header title="유저 정보" />
      <div className="px-[36px]">
        <User
          name={userInfo.nickname}
          university={userInfo.univName}
          bio={userInfo.description}
          profileImage={userInfo.profileImage}
          buttonLabel={userInfo.blocked ? '차단 해제' : '차단 하기'}
          blocked={userInfo.blocked}
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
      <div className="mt-2 flex-grow overflow-y-auto hidden-scrollbar flex-1">
        {activeTab === 'posts' && <PostList posts={posts} />}
        {activeTab === 'comments' && <PostList posts={comments} />}
        {activeTab === 'meetings' && <MeetPostList meetings={meetings} />}
      </div>
    </div>
  );
}
