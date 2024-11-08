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
  id: number;
  title: string;
  eupMyeonDong: string;
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
  author: {
    profileImage: string;
    nickname: string;
  };
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

  // 개수만 불러오기
  const fetchCounts = useCallback(async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get(`/user/stats/${userToken}`, {
        headers: { Authorization: Cookies.get('Authorization') },
      });
      const { postCount, commentCount, gatheringCount } = response.data;
      setPostCount(postCount);
      setCommentCount(commentCount);
      setMeetingCount(gatheringCount);
    } catch (error) {
      console.error('개수 불러오기 실패:', error);
    }
  }, [userToken]);

  // 사용자 정보 불러오기
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

  // 탭 클릭 시 데이터 불러오기
  const fetchDataByTab = useCallback(
    async (tab: string) => {
      if (!userToken) return;
      try {
        const headers = {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        };
        const params = { page: 0, size: 10 };
        if (tab === 'posts') {
          const response = await apiClient.get(`/user/${userToken}/posts`, { headers, params });
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
        } else if (tab === 'comments') {
          const response = await apiClient.get(`/user/${userToken}/comments`, { headers, params });
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
        } else if (tab === 'meetings') {
          const response = await apiClient.get(`/gatherings/user/${userToken}`, { headers, params });
          setMeetings(
            response.data.content.map((meeting: any) => ({
              id: meeting.id,
              title: meeting.title,
              eupMyeonDong: meeting.eupMyeonDong,
              gatheringDateTime: meeting.gatheringDateTime,
              currentMember: meeting.currentMember,
              maxMember: meeting.maxMember,
              views: meeting.views,
              thumbnail: meeting.thumbnail,
              author: {
                profileImage: meeting.author.profileImage,
                nickname: meeting.author.nickname,
              },
            })),
          );
        }
      } catch (error) {
        console.error(`${tab} 불러오기 실패:`, error);
      }
    },
    [userToken],
  );

  useEffect(() => {
    if (userToken) {
      fetchCounts(); // 개수만 먼저 불러옴
      fetchUserInfo(); // 사용자 정보 불러옴
    }
  }, [userToken, fetchCounts, fetchUserInfo]);

  useEffect(() => {
    fetchDataByTab(activeTab); // 각 탭 클릭 시 데이터를 불러옴
  }, [activeTab, fetchDataByTab]);

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
          { headers: { Authorization: Cookies.get('Authorization') } },
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

  if (!userInfo) return <div>Loading...</div>;

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
        {activeTab === 'meetings' && <MeetPostList meetings={meetings} lastMeetingRef={() => {}} />}
      </div>
    </div>
  );
}
