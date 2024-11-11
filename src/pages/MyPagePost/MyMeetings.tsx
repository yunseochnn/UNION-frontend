import { useState, useEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import MyPageMeetList from '../MyPageMeetList';

interface Meeting {
  id: number;
  title: string;
  eupMyeonDong?: string;
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
  author: {
    token: string;
    profileImage: string;
    nickname: string;
    univName: string;
  };
}

export default function MyMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
          eupMyeonDong: item.eupMyeonDong ?? '알 수 없음',
          gatheringDateTime: item.gatheringDateTime,
          views: item.views,
          thumbnail: item.thumbnail,
          author: {
            token: item.author?.token ?? '',
            profileImage: item.author?.profileImage ?? '',
            nickname: item.author?.nickname ?? '',
            univName: item.author?.univName ?? '',
          },
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
      {isLoading && page === 0 ? (
        <p></p>
      ) : (
        <MyPageMeetList meetings={meetings} pageTitle="내가 작성한 모임글" lastMeetingRef={lastMeetingRef} />
      )}
      {isLoading && page > 0 && <p></p>}
    </div>
  );
}
