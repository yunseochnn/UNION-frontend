import { useEffect, useState, useCallback, useRef } from 'react';
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
  const [postPage, setPostPage] = useState(0);
  const [commentPage, setCommentPage] = useState(0);
  const [meetingPage, setMeetingPage] = useState(0);
  const [postHasMore, setPostHasMore] = useState(true);
  const [commentHasMore, setCommentHasMore] = useState(true);
  const [meetingHasMore, setMeetingHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);

  const postObserver = useRef<IntersectionObserver | null>(null);
  const commentObserver = useRef<IntersectionObserver | null>(null);
  const meetingObserver = useRef<IntersectionObserver | null>(null);

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

  const fetchPosts = useCallback(async () => {
    if (!userToken) return;
    try {
      const headers = { Authorization: Cookies.get('Authorization') };
      const params = { page: postPage, size: 5 };
      const response = await apiClient.get(`/user/${userToken}/posts`, { headers, params });

      const mappedPosts = response.data.content.map((post: any) => ({
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
      }));
      setPosts(prevPosts => [...prevPosts, ...mappedPosts]);
      setPostHasMore(response.data.content.length > 0);
    } catch (error) {
      console.error('게시글 불러오기 실패:', error);
    }
  }, [userToken, postPage]);

  const fetchComments = useCallback(async () => {
    if (!userToken) return;
    try {
      const headers = { Authorization: Cookies.get('Authorization') };
      const params = { page: commentPage, size: 5 };
      const response = await apiClient.get(`/user/${userToken}/comments`, { headers, params });

      const mappedComments = response.data.content.map((comment: any) => ({
        id: comment.id,
        type: comment.type,
        profileImage: comment.author.profileImage,
        nickname: comment.author.nickname,
        university: comment.author.univName,
        title: comment.title,
        content: comment.contentPreview,
        likes: comment.postLikes,
        comments: comment.commentCount,
        thumbnail: comment.thumbnail,
      }));
      setComments(prevComments => [...prevComments, ...mappedComments]);
      setCommentHasMore(response.data.content.length > 0);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  }, [userToken, commentPage]);

  const fetchMeetings = useCallback(async () => {
    if (!userToken) return;
    try {
      const headers = { Authorization: Cookies.get('Authorization') };
      const params = { page: meetingPage, size: 5 };
      const response = await apiClient.get(`/gatherings/user/${userToken}`, { headers, params });
      setMeetings(prevMeetings => [...prevMeetings, ...response.data.content]);
      setMeetingHasMore(response.data.content.length > 0);
    } catch (error) {
      console.error('모임 불러오기 실패:', error);
    }
  }, [userToken, meetingPage]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (postObserver.current) postObserver.current.disconnect();
      postObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && postHasMore) {
          setPostPage(prevPage => prevPage + 1);
        }
      });
      if (node) postObserver.current.observe(node);
    },
    [postHasMore],
  );

  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (commentObserver.current) commentObserver.current.disconnect();
      commentObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && commentHasMore) {
          setCommentPage(prevPage => prevPage + 1);
        }
      });
      if (node) commentObserver.current.observe(node);
    },
    [commentHasMore],
  );

  const lastMeetingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (meetingObserver.current) meetingObserver.current.disconnect();
      meetingObserver.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && meetingHasMore) {
          setMeetingPage(prevPage => prevPage + 1);
        }
      });
      if (node) meetingObserver.current.observe(node);
    },
    [meetingHasMore],
  );

  useEffect(() => {
    if (userToken) {
      fetchCounts();
      fetchUserInfo();
    }
  }, [userToken, fetchCounts, fetchUserInfo]);

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    } else if (activeTab === 'comments') {
      fetchComments();
    } else if (activeTab === 'meetings') {
      fetchMeetings();
    }
  }, [activeTab, fetchPosts, fetchComments, fetchMeetings]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'posts' && posts.length === 0) setPostPage(0);
    if (tab === 'comments' && comments.length === 0) setCommentPage(0);
    if (tab === 'meetings' && meetings.length === 0) setMeetingPage(0);
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
  return (
    <div className="h-screen flex flex-col">
      <Header title="유저 정보" />
      <div className="px-[36px]">
        <User
          name={userInfo?.nickname || ''}
          university={userInfo?.univName || ''}
          bio={userInfo?.description || ''}
          profileImage={userInfo?.profileImage || ''}
          buttonLabel={userInfo?.blocked ? '차단 해제' : '차단 하기'}
          blocked={userInfo?.blocked || false}
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
        {activeTab === 'posts' && <PostList posts={posts} lastPostRef={lastPostRef} />}
        {activeTab === 'comments' && <PostList posts={comments} lastPostRef={lastCommentRef} />}
        {activeTab === 'meetings' && <MeetPostList meetings={meetings} lastMeetingRef={lastMeetingRef} />}
      </div>
    </div>
  );
}
