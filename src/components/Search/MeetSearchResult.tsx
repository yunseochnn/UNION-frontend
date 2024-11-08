import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import MeetPostList from '../../common/MeetPostList';
import SortOptions from '../Meet/SortOptions';
import { searchKeywordState } from '../../recoil/searchState';
import { useRecoilValue } from 'recoil';

const MeetSearchResult: React.FC = () => {
  const keyword = useRecoilValue(searchKeywordState);
  const [sortBy, setSortBy] = useState<'LATEST' | 'DISTANCE' | 'GATHERING_DATE'>('LATEST');
  const [meetings, setMeetings] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const latitude = parseFloat(localStorage.getItem('latitude') || '37.556016'); // 기본값: 서울역
  const longitude = parseFloat(localStorage.getItem('longitude') || '126.972355'); // 기본값: 서울역

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
    if (isLoading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 요청 방지

    setIsLoading(true);
    try {
      const params = {
        sortType: sortBy,
        keyword: keyword || undefined,
        page,
        size: 10,
        ...(sortBy === 'DISTANCE' && { latitude, longitude }),
      };

      console.log('Sending request with params:', params);

      const response = await apiClient.get('/gatherings', {
        params,
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      });

      console.log('Received response:', response.data);

      const newMeetings = response.data.content.map((meeting: any) => ({
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
      }));

      setMeetings(prevMeetings => (page === 0 ? newMeetings : [...prevMeetings, ...newMeetings]));
      setHasMore(response.data.content.length > 0); // 데이터가 더 있는지 확인
    } catch (error) {
      console.error('모임 목록 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy, keyword, page]);

  // page 또는 sortBy, keyword가 변경될 때마다 fetchMeetings 호출
  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return (
    <div className="flex flex-col h-screen">
      <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        {isLoading && page === 0 ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : meetings.length > 0 ? (
          <MeetPostList meetings={meetings} lastMeetingRef={lastMeetingRef} />
        ) : (
          <p className="text-center mt-4 text-gray-500">검색 결과가 없습니다.</p>
        )}
        {isLoading && page > 0 && <div className="text-center py-4">로딩 중...</div>}
        {!hasMore && <div className="text-center py-4 text-gray-500">더 이상 결과가 없습니다.</div>}
      </div>
    </div>
  );
};

export default MeetSearchResult;
