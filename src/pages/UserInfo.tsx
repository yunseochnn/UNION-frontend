import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
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
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/user/${userToken}`, {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    if (userToken) fetchUserInfo();
  }, [userToken]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await apiClient.get(`/user/${userToken}/post`, {
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

  useEffect(() => {
    if (activeTab === 'posts') fetchPosts();
  }, [activeTab, fetchPosts]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
        } else {
          await apiClient.delete(`/user/block/${userInfo.token}`, {
            headers: {
              Authorization: Cookies.get('Authorization'),
            },
          });
        }
        setUserInfo(prev => (prev ? { ...prev, isBlocked: updatedBlockedStatus } : null));
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
      <UserTabs onTabChange={handleTabChange} postCount={postCount} />
      <div className="mt-5 px-[36px]">
        {activeTab === 'posts' && <PostList posts={posts} />}
        {activeTab === 'comments' && <div>댓글 목록</div>}
        {activeTab === 'meetings' && <div>모임글 목록</div>}
      </div>
    </div>
  );
}
