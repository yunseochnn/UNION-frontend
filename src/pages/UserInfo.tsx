import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
import { blockedUserState } from '../recoil/blockedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';
import PostList from '../common/PostList';
import Cookies from 'js-cookie';

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
  const userToken = useRecoilValue(selectedUserState);
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUserState);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<PostType[]>([]);
  const [meetings, setMeetings] = useState<PostType[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);
  const [activeTab, setActiveTab] = useState('posts');

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/user/${userToken}`, {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        });
        const fetchedUserInfo = response.data;
        const isUserBlocked = blockedUsers.some(user => user.token === fetchedUserInfo.token);

        setUserInfo({ ...fetchedUserInfo, isBlocked: isUserBlocked });
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    if (userToken) fetchUserInfo();
  }, [userToken, blockedUsers]);

  // 게시물 가져오기
  const fetchPosts = useCallback(async () => {
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

  // 차단 토글
  const handleBlockToggle = async () => {
    if (userInfo) {
      const updatedBlockedStatus = !userInfo.isBlocked;
      try {
        if (updatedBlockedStatus) {
          await apiClient.post(
            `/user/block/${userInfo.token}`,
            {},
            {
              headers: {
                Authorization: Cookies.get('Authorization'),
              },
            },
          );
          setUserInfo({ ...userInfo, isBlocked: true });
          setBlockedUsers(prev => [...prev, { ...userInfo, isBlocked: true }]);
        } else {
          await apiClient.delete(`/user/block/${userInfo.token}`, {
            headers: {
              Authorization: Cookies.get('Authorization'),
            },
          });
          setUserInfo({ ...userInfo, isBlocked: false });
          setBlockedUsers(prev => prev.filter(user => user.token !== userInfo.token));
        }
      } catch (error) {
        console.error('차단/차단 해제 실패:', error);
      }
    }
  };

  if (!userInfo) return <div>유저 정보를 불러오는 중입니다...</div>;

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="유저 정보" navigateTo="/mypage" />
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
