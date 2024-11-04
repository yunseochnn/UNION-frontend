import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModal }: Props) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const onClickBack = () => {
    if (from === 'write') {
      navigate(`/board/${type}`);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black" onClick={onClickBack}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`게시글`}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
