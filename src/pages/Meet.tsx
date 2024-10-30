import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MeetHeader from '../components/Meet/MeetHeader';
import FloatingActionButton from '../common/FloatingActionButton';
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdEye } from "react-icons/io"; 

const Meet: React.FC = () => {
  const [sortBy, setSortBy] = useState('가까운 거리 순');
  const navigate = useNavigate();

  const meetings = [
    {
      id: 1,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 1,
      maxParticipants: 4,
      views: 24,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 2,
      title: '피나게 가보자구',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 2,
      maxParticipants: 4,
      views: 30,
      host: '만남',
      area: '잠실동',
    },
    {
      id: 3,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 3,
      maxParticipants: 4,
      views: 15,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 4,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 4,
      maxParticipants: 4,
      views: 40,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 5,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 2,
      maxParticipants: 4,
      views: 18,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 6,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 2,
      maxParticipants: 4,
      views: 18,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 7,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 3,
      maxParticipants: 4,
      views: 15,
      host: '카페 창업',
      area: '서초동',
    },
    {
      id: 8,
      title: '취창업 전시케어',
      date: '오늘',
      time: '오후 4:00',
      currentParticipants: 4,
      maxParticipants: 4,
      views: 40,
      host: '카페 창업',
      area: '서초동',
    },
  ];

  const handleMeetingClick = (id: number) => {
    navigate(`/meet/${id}`);
  };

  const handlePlusClick = () => {
    navigate('/meet/new'); // 플러스 버튼 클릭 시 새로운 모임 생성 페이지로 이동
  };

  return (
    <div className="relative center-content flex flex-col bg-white">
      <MeetHeader sortBy={sortBy} setSortBy={setSortBy} />
 
      <main className="flex-1 overflow-y-auto relative flex flex-col px-[20px]">
        {meetings.map(meeting => (
          <div key={meeting.id} className="border-b py-4 cursor-pointer" onClick={() => handleMeetingClick(meeting.id)}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500">{`${meeting.host} · ${meeting.area}`}</div>
                <h2 className="font-bold text-lg">{meeting.title}</h2>
                <div className="text-sm text-gray-600">{`${meeting.date}, ${meeting.time}`}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center">
                  <BsFillPeopleFill size={12} className="mr-1" /> {/* 크기 줄였습니다 */}
                  <span>{`${meeting.currentParticipants}/${meeting.maxParticipants}`}</span>
                  <div className="flex items-center ml-2">
                  <IoMdEye size={14} className="mr-1" /> {/* 하트 아이콘을 눈 아이콘으로 변경했습니다!! */}
                  <span>{meeting.views}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img
                  alt={meeting.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
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