import { useState, useEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import MyPageMeetList from '../MyPageMeetList';

interface Meeting {
  id: number;
  profileImage?: string;
  nickname: string;
  eupMyeonDong?: string;
  title: string;
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
}

export default function MyMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  // 마지막 요소를 감지
  const lastMeetingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  // 모임글 불러오기
  const fetchMeetings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/gatherings/my', {
        params: { page, size: 5 },
        headers: {
          Authorization: Cookies.get('Authorization') ?? '',
          'Content-Type': 'application/json',
        },
      });

      const content = response.data?.content;
      if (content && Array.isArray(content)) {
        const newMeetings = content.map((item: any) => ({
          id: item.id,
          title: item.title,
          maxMember: item.maxMember,
          currentMember: item.currentMember,
          eupMyeonDong: item.eupMyeonDong,
          gatheringDateTime: item.gatheringDateTime,
          views: item.views,
          profileImage: item.author?.profileImage,
          nickname: item.author?.nickname,
          thumbnail: item.thumbnail,
        }));

        setMeetings(prevMeetings => [...prevMeetings, ...newMeetings]);
        setHasMore(!response.data.last);
      }
    } catch (error) {
      console.error('모임글 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return (
    <div>
      <MyPageMeetList meetings={meetings} pageTitle="내가 작성한 모임글" lastMeetingRef={lastMeetingRef} />
      {isLoading && <div></div>}
    </div>
  );
}
