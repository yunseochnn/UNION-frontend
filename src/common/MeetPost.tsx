import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';

interface MeetPostProps {
  profileImage?: string;
  nickname: string;
  eupMyeonDong?: string;
  title: string;
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
}

export default function MeetPost({
  profileImage,
  nickname,
  eupMyeonDong,
  title,
  gatheringDateTime,
  currentMember,
  maxMember,
  views,
  thumbnail,
}: MeetPostProps) {
  return (
    <button className="w-full bg-white px-[23px] text-left">
      <div className="py-[15px] border-b-[1.5px] border-[#F2F3F6]">
        <div className="flex justify-between items-center mx-[5px]">
          <div className="flex flex-col flex-grow mr-3">
            {/* 프로필 이미지, 닉네임, 위치 정보 */}
            <div className="flex items-center text-[12px]">
              <img src={profileImage} alt="Profile" className="w-[20px] h-[20px] rounded-full mr-[5px]" />
              <div className="flex items-center">
                <span className="text-customGray1">{nickname}</span>
                <span className="mx-[3px] text-customGray">·</span>
                <span className="text-customGray2">{eupMyeonDong || '위치 미정'}</span>
              </div>
            </div>

            {/* 모임 제목과 날짜 */}
            <h2 className="mt-2 text-[17px] text-customBlack font-semibold truncate max-w-[200px] lg:max-w-[240px]">
              {title}
            </h2>
            <div className="text-[14px] text-customGray2">{new Date(gatheringDateTime).toLocaleString()}</div>

            {/* 인원수와 조회수 */}
            <div className="mt-1 flex space-x-2 text-customBlack text-[11px]">
              <span className="flex items-center space-x-1">
                <BsFillPeopleFill className="text-customGray2" />
                <span>{`${currentMember}/${maxMember}`}</span>
              </span>
              <span className="flex items-center space-x-1">
                <IoMdEye className="text-customGray2" />
                <span>{views}</span>
              </span>
            </div>
          </div>

          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-[90px] h-[90px] object-cover rounded-md flex-shrink-0"
              style={{ aspectRatio: '1/1' }}
            />
          )}
        </div>
      </div>
    </button>
  );
}
