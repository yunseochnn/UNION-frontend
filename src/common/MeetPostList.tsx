import React from 'react';
import { useNavigate } from 'react-router-dom';
import MeetPost from './MeetPost';

interface MeetPostListProps {
  meetings: {
    id: number;
    title: string;
    eupMyeonDong: string;
    gatheringDateTime: string;
    currentMember: number;
    maxMember: number;
    views: number;
    thumbnail?: string;
    author: {
      profileImage: string;
      nickname: string;
    };
  }[];
  lastMeetingRef?: (node: HTMLDivElement | null) => void;
  sortType?: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE';
}

const MeetPostList: React.FC<MeetPostListProps> = ({ meetings, lastMeetingRef }) => {
  const navigate = useNavigate();

  const handlePostClick = (id: number) => {
    navigate(`/meet/${id}`);
  };

  return (
    <div>
      {meetings.map((meeting, index) => (
        <div
          key={meeting.id}
          ref={index === meetings.length - 1 ? lastMeetingRef : null}
          onClick={() => handlePostClick(meeting.id)}
        >
          <MeetPost meeting={meeting} /> {/* sortType 전달 */}
        </div>
      ))}
      {meetings.length > 0 && <div className="h-3" />}
    </div>
  );
};

export default MeetPostList;
