import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MeetHeader from '../components/Meet/MeetHeader';
import FloatingActionButton from '../common/FloatingActionButton';
import MeetPostList from '../common/MeetPostList'; // MeetPostList 임포트

import { ReadMeetListRequest } from '../api/ReadMeetListRequest';
import { Meeting } from '../api/ReadMeetListRequest';

const Meet: React.FC = () => {
  const [sortBy, setSortBy] = useState<'LATEST' | 'DISTANCE' | 'GATHERING_DATE'>('LATEST');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 37.556016,
    longitude: 126.972355,
  });
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());
        },
        error => {
          console.error('위치를 가져오는 데 실패했습니다:', error);
        },
      );
    }
  }, []);

  const lastMeetingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  const fetchMeetings = useCallback(
    async (pageNum: number) => {
      try {
        setIsLoading(true);
        const response = await ReadMeetListRequest.getMeetList(
          sortBy,
          userLocation.latitude,
          userLocation.longitude,
          pageNum,
          10,
        );

        const newData = response.data.content;
        if (pageNum === 0) {
          setMeetings(newData);
        } else {
          setMeetings(prev => [...prev, ...newData]);
        }
        setHasMore(!response.data.last);
      } catch (error) {
        console.error('모임 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [sortBy, userLocation],
  );

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    setPage(0);
    setMeetings([]);
    fetchMeetings(0);
  }, [sortBy, fetchMeetings]);

  useEffect(() => {
    if (page > 0) {
      fetchMeetings(page);
    }
  }, [page, fetchMeetings]);

  return (
    <div className="relative center-content flex flex-col bg-white">
      <MeetHeader sortBy={sortBy} setSortBy={setSortBy} />

      <main className="flex-1 overflow-y-auto relative flex flex-col hidden-scrollbar">
        <MeetPostList meetings={meetings} lastMeetingRef={lastMeetingRef} />
        {isLoading && <div></div>}
      </main>

      <div className="right-8 bottom-24 absolute">
        <FloatingActionButton onClick={() => navigate('/meet/write')} />
      </div>

      <footer className="h-20 w-full flex justify-center items-center">
        <div className="w-[90%] items-center h-full">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Meet;
