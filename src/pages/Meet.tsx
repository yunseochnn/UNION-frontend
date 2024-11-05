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
  const [sortBy, setSortBy] = useState<'LATEST' | 'DISTANCE' | 'GATHERING_DATE'>('DISTANCE');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const navigate = useNavigate();

  // 마지막 요소를 관찰하는 콜백 함수
  const lastMeetingRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);





//   모임 목록을 불러오는 함수
//   pageNum - 현재 페이지 번호 (0부터 시작)
   
//   1. sortBy 값에 따라 다른 방식으로 데이터를 불러옴
//   - 'DISTANCE': 현재 위치 기반으로 가까운 순서
//   - 'LATEST' 또는 'GATHERING_DATE': 기본 위치값 사용
   
//   2. 페이지네이션 처리
//   - pageNum이 0일 때: 새로운 데이터로 교체
//   - pageNum이 0보다 클 때: 기존 데이터에 새 데이터 추가
  
//   3. 무한 스크롤을 위한 추가 데이터 존재 여부 확인
//   - response.data.last가 true면 더 이상 데이터가 없음
 

const fetchMeetings = useCallback(async (pageNum: number) => {
  try {
    setIsLoading(true); // 로딩 상태 시작
    
    if (sortBy === 'DISTANCE') {
      // 위치 기반 정렬일 때는 현재 위치 정보를 가져옴
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log('현재 위치:', position.coords.latitude, position.coords.longitude);
          // 현재 위치 기반으로 API 호출
          const response = await ReadMeetListRequest.getMeetList(
            sortBy,
            position.coords.latitude,
            position.coords.longitude,
            pageNum,
            10  // 한 페이지당 10개의 데이터
          );
          
          const newData = response.data.content;
          if (pageNum === 0) {
            setMeetings(newData); // 첫 페이지면 데이터 교체
          } else {
            setMeetings(prev => [...prev, ...newData]); // 이후 페이지는 데이터 추가
          }
          
          // 마지막 페이지 여부 설정
          setHasMore(!response.data.last);
        },
        async (error) => {
          // 위치 정보를 가져오는데 실패했을 때의 처리
          console.error('위치 정보를 가져올 수 없습니다:', error);
          // 기본 위치값으로 API 호출
          const response = await ReadMeetListRequest.getMeetList(
            sortBy, 
            undefined, 
            undefined, 
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
        }
      );
    } else {
      // LATEST 또는 GATHERING_DATE 정렬일 때
      const response = await ReadMeetListRequest.getMeetList(
        sortBy, 
        undefined, 
        undefined, 
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
    }
  } catch (error) {
    console.error('모임 목록 조회 실패:', error);
  } finally {
    setIsLoading(false); // 로딩 상태 종료
  }
}, [sortBy]);  // sortBy가 변경될 때마다 함수 재생성






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

      <main className="flex-1 overflow-y-auto relative flex flex-col px-[23px]">
        {meetings.map((meeting, index) => (
          <div 
            ref={index === meetings.length - 1 ? lastMeetingRef : null}
            key={meeting.id} 
            className="border-b py-4 cursor-pointer" 
            onClick={() => handleMeetingClick(meeting.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  {meeting.author.nickname} · {meeting.author.univName}
                </div>
                <div className="text-xs text-gray-500">{meeting.eupMyeonDong || '위치 미정'}</div>
                <h2 className="font-bold text-lg">{meeting.title}</h2>
                <div className="text-sm text-gray-600">{new Date(meeting.gatheringDateTime).toLocaleString()}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center">
                  <BsFillPeopleFill size={12} className="mr-1" />
                  <span>{`${meeting.currentMember}/${meeting.maxMember}`}</span>
                  <div className="flex items-center ml-2">
                    <IoMdEye size={14} className="mr-1" />
                    <span>{meeting.views}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 rounded-md overflow-hidden">
                {meeting.thumbnail ? (
                  <img 
                    src={meeting.thumbnail} 
                    alt={meeting.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center py-4">
            Loading...
          </div>
        )}
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