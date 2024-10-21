import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const items = ['내가 작성한 게시글', '내가 작성한 모임글', '내가 작성한 댓글', '차단 유저'];

export default function MypageMenuList() {
  const navigate = useNavigate();
  return (
    <div className="mt-6 space-y-2 font-semibold">
      {items.map((item, index) => (
        <button
          key={index}
          className="w-full flex justify-between items-center  border-gray-300 py-2 focus:outline-none"
          onClick={() => {
            if (item === '차단 유저') {
              navigate('/BlockedUser');
            }
          }}
        >
          <span className="text-[16px] text-left">{item}</span>
          <IoIosArrowForward className="text-customBlack text-[20px]" />
        </button>
      ))}
    </div>
  );
}
