import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MeetHeader from '../components/Meet/MeetHeader';
import FloatingActionButton from '../common/FloatingActionButton';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { ReadMeetListRequest } from '../api/ReadMeetListRequest';  // import 수정

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  currentParticipants: number;
  maxParticipants: number;
  views: number;
  host: string;
  area: string;
}

const Meet: React.FC = () => {
  const [sortBy, setSortBy] = useState('가까운 거리 순');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // API 호출 부분 수정
        const response = await ReadMeetListRequest.getMeetList();
        setMeetings(response.data);
      } catch (error) {
        console.error('모임 목록 조회 실패:', error);
      }
    };

    fetchMeetings();
  }, []);

  const handleMeetingClick = (id: number) => {
    navigate(`/meet/${id}`);
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
                  <BsFillPeopleFill size={12} className="mr-1" />
                  <span>{`${meeting.currentParticipants}/${meeting.maxParticipants}`}</span>
                  <div className="flex items-center ml-2">
                    <IoMdEye size={14} className="mr-1" />
                    <span>{meeting.views}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <img alt={meeting.title} className="w-full h-full object-cover" />
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