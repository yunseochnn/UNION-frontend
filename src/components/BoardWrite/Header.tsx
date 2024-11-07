import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

interface Prop {
  success: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ success, setClick }: Prop) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const onClick = () => {
    if (success) {
      setClick(true);
    }
  };

  const onClickBack = () => {
    navigate(`/board/${type}`);
  };
  return (
    <div className="flex items-center justify-between w-full h-[62px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black" onClick={onClickBack}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`게시판 글쓰기`}</div>
      <div className="flex gap-[20px]" onClick={onClick}>
        <div className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}>완료</div>
      </div>
    </div>
  );
};

export default Header;
