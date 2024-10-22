import { BiComment } from 'react-icons/bi';
import { LuHeart } from 'react-icons/lu';

interface PostProps {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail: string;
}

export default function Post({
  profileImage,
  nickname,
  university,
  title,
  content,
  likes,
  comments,
  thumbnail,
}: PostProps) {
  return (
    <div className="w-full bg-white flex justify-between items-center px-[28px] py-[15px] border-b-[1.5px] border-[#F2F3F6]">
      <div className="flex flex-col flex-grow mr-3">
        <div className="flex items-center text-[12px]">
          <img src={profileImage} alt="Profile" className="w-[20px] h-[20px] rounded-full mr-[5px]" />
          <div className="flex items-center">
            <span className="text-[#4D5159]">{nickname}</span>
            <span className="mx-[3px] text-customGray">·</span>
            <span className="text-customGray truncate ">{university}</span>
          </div>
        </div>
        <p className="mt-2 text-[16px] text-customBlack font-semibold truncate  max-w-[270px]">{title}</p>
        <p className="text-[14px] text-customGray truncate max-w-[270px]">{content}</p>
        <div className="mt-1 flex space-x-2 text-customBlack text-[11px]">
          <span className="flex items-center space-x-1">
            <LuHeart />
            <span>{likes}</span>
          </span>
          <span className="flex items-center space-x-1">
            <BiComment />
            <span>{comments}</span>
          </span>
        </div>
      </div>

      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-[90px] h-[90px] object-cover rounded-md flex-shrink-0"
        style={{ aspectRatio: '1/1' }}
      />
    </div>
  );
}
