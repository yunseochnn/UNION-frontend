import { IoIosArrowBack } from 'react-icons/io';

interface Prop {
  success: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ success, setModify, setClick }: Prop) => {
  const onClickBack = () => {
    setModify(false);
  };

  const onClickUpdate = () => {
    setClick(true);
  };
  return (
    <div className="flex items-center justify-between w-full h-[60px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black" onClick={onClickBack}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">게시글 수정하기</div>
      <div className="flex gap-[20px]" onClick={onClickUpdate}>
        <div className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}>수정</div>
      </div>
    </div>
  );
};

export default Header;
