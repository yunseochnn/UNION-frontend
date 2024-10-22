import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const items = [
  { label: '내가 작성한 게시글', path: '/myposts' },
  { label: '내가 작성한 모임글', path: '/mymeetings' },
  { label: '내가 작성한 댓글', path: '/mycomments' },
  { label: '차단 유저', path: '/blockeduser' },
];

export default function MypageMenuList() {
  const navigate = useNavigate();

  return (
    <div className="mt-5 font-semibold">
      {items.map((item, index) => (
        <button
          key={index}
          className="w-full flex justify-between items-center border-gray-300 py-2 focus:outline-none"
          onClick={() => navigate(item.path)}
        >
          <span className="text-[16px] text-left">{item.label}</span>
          <IoIosArrowForward className="text-customBlack text-[20px]" />
        </button>
      ))}
    </div>
  );
}
