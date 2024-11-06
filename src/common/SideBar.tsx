import { FaRegUser, FaUser } from 'react-icons/fa6';
import { HiOutlinePencilSquare, HiPencilSquare } from 'react-icons/hi2';
import { IoChatbubbles, IoChatbubblesOutline, IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import HomeOutline from '/sidebar/home-outline.svg';
import MeetOuline from '/sidebar/location-outline.svg';
import FillOutline from '/sidebar/Vector.svg';

const SideBar = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  return (
    <div className="border-t">
      <div className="flex justify-between w-full mt-2">
        <div
          className="flex flex-col justify-center items-center cursor-pointer ml-3"
          onClick={() => navigate('/home')}
        >
          {' '}
          <div>
            {pathname.includes('home') ? (
              <IoHome size={20} style={{ strokeWidth: '2' }} />
            ) : (
              <img src={HomeOutline} width={20} height={20} />
            )}
          </div>
          <div className="text-xs">홈</div>
        </div>

        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => navigate('/board')}>
          {' '}
          <div>{pathname.includes('board') ? <HiPencilSquare size={20} /> : <HiOutlinePencilSquare size={20} />}</div>
          <div className="text-xs">게시판</div>
        </div>

        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => navigate('/meet')}>
          <div>
            {pathname.includes('meet') ? (
              <img src={FillOutline} width={23} height={23} />
            ) : (
              <img src={MeetOuline} width={23} height={23} />
            )}
          </div>
          <div className="text-xs">모임</div>
        </div>

        <div
          className="flex flex-col justify-center items-center ml-2 cursor-pointer "
          onClick={() => navigate('/chatList')}
        >
          <div>{pathname.includes('chatList') ? <IoChatbubbles size={20} /> : <IoChatbubblesOutline size={20} />}</div>
          <div className="text-xs">채팅</div>
        </div>

        <div className="flex flex-col justify-center items-center cursor-pointer " onClick={() => navigate('/myPage')}>
          <div>
            <div>{pathname.includes('myPage') ? <FaUser size={20} /> : <FaRegUser size={20} />}</div>
          </div>
          <div className="text-xs">마이페이지</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
