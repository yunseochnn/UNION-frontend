import { HiOutlinePencilSquare } from 'react-icons/hi2';
import Header from '../common/Header';
import MeetPostList from '../common/MeetPostList';

export interface Meeting {
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
}

interface MyPageMeetListProps {
  meetings: Meeting[];
  pageTitle: string;
  lastMeetingRef?: (node: HTMLDivElement | null) => void;
}

export default function MyPageMeetList({ meetings, pageTitle, lastMeetingRef }: MyPageMeetListProps) {
  const emptyMessage = (() => {
    switch (pageTitle) {
      case '내가 작성한 모임글':
        return '작성한 모임글이 없습니다';
      default:
        return '모임글이 없습니다';
    }
  })();

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header title={pageTitle} />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        {meetings.length > 0 ? (
          <MeetPostList meetings={meetings} lastMeetingRef={lastMeetingRef} />
        ) : (
          <div className="flex flex-col items-center mt-[50%] text-customGray2 text-[18px] flex-grow flex-1">
            <HiOutlinePencilSquare size={50} className="mb-1" />
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
