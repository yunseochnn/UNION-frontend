import { FaRegUser, FaUser } from 'react-icons/fa6';
import { HiOutlinePencilSquare, HiPencilSquare } from 'react-icons/hi2';
import { IoChatbubbles, IoChatbubblesOutline, IoHome, IoHomeOutline } from 'react-icons/io5';
import { RiMapPinFill, RiMapPinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  console.log(pathname.includes('MyPage'));
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => navigate('/')}>
        {' '}
        <div>{pathname === '/' ? <IoHome size={20} style={{ strokeWidth: '2' }} /> : <IoHomeOutline size={20} />}</div>
        <div className="text-xs">홈</div>
      </div>

      <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => navigate('/Board')}>
        {' '}
        <div>{pathname.includes('Board') ? <HiPencilSquare size={20} /> : <HiOutlinePencilSquare size={20} />}</div>
        <div className="text-xs">게시판</div>
      </div>

      <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => navigate('/Meet')}>
        <div>{pathname.includes('Meet') ? <RiMapPinFill size={20} /> : <RiMapPinLine size={20} />}</div>
        <div className="text-xs">모임</div>
      </div>

      <div className="flex flex-col justify-center items-center ml-1 cursor-pointer" onClick={() => navigate('/Chat')}>
        <div>{pathname.includes('Chat') ? <IoChatbubbles size={20} /> : <IoChatbubblesOutline size={20} />}</div>
        <div className="text-xs">채팅</div>
      </div>

      <div className="flex flex-col justify-center items-center cursor-pointers" onClick={() => navigate('/MyPage')}>
        <div>
          <div>{pathname.includes('MyPage') ? <FaUser size={20} /> : <FaRegUser size={20} />}</div>
        </div>
        <div className="text-xs">마이페이지</div>
      </div>
    </div>
  );
};

export default SideBar;
