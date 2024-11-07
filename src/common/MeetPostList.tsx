import { useNavigate } from 'react-router-dom';
import MeetPost from './MeetPost';

interface Meeting {
  profileImage?: string;
  nickname: string;
  eupMyeonDong?: string;
  title: string;
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
  id: number;
}

interface MeetPostListProps {
  meetings: Meeting[];
  lastMeetingRef?: (node: HTMLDivElement | null) => void;
}

export default function MeetPostList({ meetings, lastMeetingRef }: MeetPostListProps) {
  const navigate = useNavigate();

  const handleMeetingClick = (meeting: Meeting) => {
    navigate(`/meet/${meeting.id}`);
  };

  return (
    <div>
      {meetings.map((meeting, index) => (
        <div
          key={meeting.id}
          ref={index === meetings.length - 1 ? lastMeetingRef : null}
          onClick={() => handleMeetingClick(meeting)}
        >
          <MeetPost
            profileImage={meeting.profileImage}
            nickname={meeting.nickname}
            eupMyeonDong={meeting.eupMyeonDong}
            title={meeting.title}
            gatheringDateTime={meeting.gatheringDateTime}
            currentMember={meeting.currentMember}
            maxMember={meeting.maxMember}
            views={meeting.views}
            thumbnail={meeting.thumbnail}
          />
        </div>
      ))}
      {meetings.length > 0 && <div className="h-7" />}
    </div>
  );
}
