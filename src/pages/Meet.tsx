import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        if (sortBy === 'DISTANCE') {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const response = await ReadMeetListRequest.getMeetList(
              sortBy,
              position.coords.latitude,
              position.coords.longitude
            );
            setMeetings(response.data.content);
          });
        } else {
          const response = await ReadMeetListRequest.getMeetList(sortBy);
          setMeetings(response.data.content);
        }
      } catch (error) {
        console.error('모임 목록 조회 실패:', error);
      }
    };

    fetchMeetings();
  }, [sortBy]);

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
                <div className="text-xs text-gray-500">{meeting.eupMyeonDong || '위치 미정'}</div>
                <h2 className="font-bold text-lg">{meeting.title}</h2>
                <div className="text-sm text-gray-600">
                  {new Date(meeting.gatheringDateTime).toLocaleString()}
                </div>
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