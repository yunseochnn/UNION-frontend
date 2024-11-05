import { IoIosArrowBack } from 'react-icons/io';

interface Prop {
  success: boolean;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateMeet: () => void;
}

const Header = ({ success, onUpdateMeet, setModify }: Prop) => {
  const onClick = () => {
    if (success) {
      onUpdateMeet();
    }
  };
  return (
    <div className="flex items-center justify-between w-[90%] h-[60px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black" onClick={() => setModify(false)}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`모임 수정하기`}</div>
      <div className="flex gap-[20px]">
        <div
          className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}
          onClick={onClick}
        >
          수정
        </div>
      </div>
    </div>
  );
};

export default Header;
