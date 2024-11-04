import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { LuSendHorizonal } from 'react-icons/lu';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | undefined;
}

const Header = ({ setModal, title }: Props) => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const navigate = useNavigate();

  const onClickBack = () => {
    if (from === 'write') {
      navigate('meet');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black" onClick={onClickBack}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer">
          <LuSendHorizonal size={20} />
        </div>
        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
