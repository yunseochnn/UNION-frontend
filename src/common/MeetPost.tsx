import React from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';

interface MeetPostProps {
  meeting: {
    id: number;
    title: string;
    eupMyeonDong?: string;
    gatheringDateTime: string;
    currentMember: number;
    maxMember: number;
    views: number;
    thumbnail?: string;
    author: {
      profileImage: string;
      nickname: string;
    };
  };
}

const MeetPost: React.FC<MeetPostProps> = ({ meeting }) => {
  return (
    <button className="w-full bg-white px-[23px] text-left">
      <div className="py-[15px] border-b-[1.5px] border-[#F2F3F6]">
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
            <div className="text-[14px] text-customGray2">{new Date(meeting.gatheringDateTime).toLocaleString()}</div>

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

          {meeting.thumbnail && (
            <img
              src={meeting.thumbnail}
              alt={meeting.title}
              className="w-[90px] h-[90px] object-cover rounded-md flex-shrink-0"
              style={{ aspectRatio: '1/1' }}
            />
          )}
        </div>
      </div>
    </button>
  );
};

export default MeetPost;
