import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MeetHeader from '../components/Meet/MeetHeader';
import FloatingActionButton from '../common/FloatingActionButton';  // 추가된 컴포넌트
import { FaUser, FaHeart } from 'react-icons/fa';  // FaUser, FaHeart 임포트


const Meet: React.FC = () => {
  const [sortBy, setSortBy] = useState('가까운 거리 순');
  const navigate = useNavigate();
  
  const meetings = [
    { id: 1, title: '취창업 전시케어', date: '오늘', time: '오후 4:00', currentParticipants: 1, maxParticipants: 4, likes: 24, host: '카페 창업', area: '서초동' },
    { id: 2, title: '피나게 가보자구', date: '오늘', time: '오후 4:00', currentParticipants: 2, maxParticipants: 4, likes: 30, host: '만남', area: '잠실동' },
    { id: 3, title: '취창업 전시케어', date: '오늘', time: '오후 4:00', currentParticipants: 3, maxParticipants: 4, likes: 15, host: '카페 창업', area: '서초동' },
    { id: 4, title: '취창업 전시케어', date: '오늘', time: '오후 4:00', currentParticipants: 4, maxParticipants: 4, likes: 40, host: '카페 창업', area: '서초동' },
    { id: 5, title: '취창업 전시케어', date: '오늘', time: '오후 4:00', currentParticipants: 2, maxParticipants: 4, likes: 18, host: '카페 창업', area: '서초동' },
  ];

  const handleMeetingClick = (id: number) => {
    navigate(`/Meet/${id}`);
  };

  const handlePlusClick = () => {
    navigate('/Meet/new');  // 플러스 버튼 클릭 시 새로운 모임 생성 페이지로 이동
  };

  return (
    <div className="center-content flex flex-col bg-white relative">
      <MeetHeader sortBy={sortBy} setSortBy={setSortBy} />

      <main className="flex-1 overflow-y-auto">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className="border-b p-4 cursor-pointer" 
            onClick={() => handleMeetingClick(meeting.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500">{`${meeting.host} · ${meeting.area}`}</div>
                <h2 className="font-bold text-lg">{meeting.title}</h2>
                <div className="text-sm text-gray-600">{`${meeting.date}, ${meeting.time}`}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center">
                  <FaUser className="mr-1" />
                  <span className="mr-2">{`${meeting.currentParticipants}/${meeting.maxParticipants}`}</span>
                  <div className="flex items-center ml-2">
                    <FaHeart className="text-red-500 mr-1" />
                    <span>{meeting.likes}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img 
                  //src={meeting.imageUrl} 
                  alt={meeting.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* 플로팅 액션 버튼 */}
      <FloatingActionButton onClick={handlePlusClick} />

      <footer className="mt-auto border-t">
        <div className="flex justify-center">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Meet;
