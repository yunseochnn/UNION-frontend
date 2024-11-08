import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MeetHeader from '../components/Meet/MeetHeader';
import FloatingActionButton from '../common/FloatingActionButton';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { ReadMeetListRequest } from '../api/ReadMeetListRequest';
import { Meeting } from '../api/ReadMeetListRequest';

const Meet: React.FC = () => {
  const [sortBy, setSortBy] = useState<'LATEST' | 'DISTANCE' | 'GATHERING_DATE'>('LATEST'); // 기본값을 LATEST로 변경
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 37.556016,
    longitude: 126.972355
  });
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();

  // 위치 정보 가져오기
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
        }
      );
    }
  }, []);

  // 마지막 요소를 관찰하는 콜백 함수
  const lastMeetingRef = useCallback(
    (node: HTMLDivElement) => {
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
          10
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
    [sortBy, userLocation]
  );

  // 컴포넌트 마운트 시 위치 정보 가져오기
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  // sortBy가 변경될 때 데이터 초기화 후 다시 불러오기
  useEffect(() => {
    setPage(0);
    setMeetings([]);
    fetchMeetings(0);
  }, [sortBy, fetchMeetings]);

  // page가 변경될 때 추가 데이터 불러오기
  useEffect(() => {
    if (page > 0) {
      fetchMeetings(page);
    }
  }, [page, fetchMeetings]);

  const handleMeetingClick = (id: number) => {
    navigate(`/meet/${id}`);
  };

  return (
    <div className="relative center-content flex flex-col bg-white">
      <MeetHeader sortBy={sortBy} setSortBy={setSortBy} />

      <main className="flex-1 overflow-y-auto relative flex flex-col px-[23px] hidden-scrollbar">
        {meetings.map((meeting, index) => (
          <div
            ref={index === meetings.length - 1 ? lastMeetingRef : null}
            key={meeting.id}
            className="border-b py-4 cursor-pointer w-full bg-white"
            onClick={() => handleMeetingClick(meeting.id)}
          >
            <div className="flex justify-between items-center mx-[5px]">
              <div className="flex flex-col flex-grow mr-3">
                <div className="flex items-center text-[12px]">
                  <img
                    src={meeting.author?.profileImage}
                    alt="Profile"
                    className="w-[20px] h-[20px] rounded-full mr-[5px]"
                  />
                  <div className="flex items-center">
                    <span className="text-customGray1">{meeting.author?.nickname}</span>
                    <span className="mx-[3px] text-customGray">·</span>
                    <span className="text-customGray2">{meeting.eupMyeonDong || '위치 미정'}</span>
                  </div>
                </div>

                <h2 className="mt-2 text-[17px] text-customBlack font-semibold truncate max-w-[200px] lg:max-w-[240px]">
                  {meeting.title}
                </h2>
                <div className="text-[14px] text-customGray2">
                  {new Date(meeting.gatheringDateTime).toLocaleString()}
                </div>

                <div className="mt-1 flex space-x-2 text-customBlack text-[11px]">
                  <span className="flex items-center space-x-1">
                    <BsFillPeopleFill className="text-customGray2" />
                    <span>{`${meeting.currentMember}/${meeting.maxMember}`}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <IoMdEye className="text-customGray2" />
                    <span>{meeting.views}</span>
                  </span>
                </div>
              </div>

              {meeting.thumbnail ? (
                <img
                  src={meeting.thumbnail}
                  alt={meeting.title}
                  className="w-[90px] h-[90px] object-cover rounded-md flex-shrink-0"
                  style={{ aspectRatio: '1/1' }}
                />
              ) : (
                <div
                  className="w-[90px] h-[90px] bg-gray-200 rounded-md flex-shrink-0"
                  style={{ aspectRatio: '1/1' }}
                />
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center py-4">Loading...</div>}
      </main>

      <div className="right-8 bottom-24 absolute">
        <FloatingActionButton onClick={() => navigate('/meet/write')} />
      </div>

      <footer className="h-14 w-full flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Meet;