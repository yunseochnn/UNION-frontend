import { FaRegUser } from 'react-icons/fa6';
import { HiOutlinePencilSquare, HiPencilSquare } from 'react-icons/hi2';
import { IoChatbubbles, IoChatbubblesOutline, IoHome, IoHomeOutline } from 'react-icons/io5';
import { RiMapPinFill, RiMapPinLine } from 'react-icons/ri';

const SideBar = () => {
  const pathname = window.location.pathname;
  return (
    <div className="flex gap-12">
      <div className="flex flex-col justify-center items-center">
        {' '}
        <div>{pathname === '/' ? <IoHome size={20} /> : <IoHomeOutline size={20} />}</div>
        <div className="text-xs">홈</div>
      </div>

      <div className="flex flex-col justify-center items-center">
        {' '}
        <div>{pathname.includes('Board') ? <HiPencilSquare size={20} /> : <HiOutlinePencilSquare size={20} />}</div>
        <div className="text-xs">게시판</div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div>{pathname.includes('Meet') ? <RiMapPinFill size={20} /> : <RiMapPinLine size={20} />}</div>
        <div className="text-xs">모임</div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div>{pathname.includes('Chat') ? <IoChatbubbles size={20} /> : <IoChatbubblesOutline size={20} />}</div>
        <div className="text-xs">채팅</div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div>
          <FaRegUser size={20} />
        </div>
        <div className="text-xs">마이페이지</div>
      </div>
    </div>
  );
};

export default SideBar;
