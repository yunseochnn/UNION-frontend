import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { LuSendHorizonal } from 'react-icons/lu';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | undefined;
  token: string;
  authorNickname: string;
}

const Header = ({ setModal, title, token, authorNickname }: Props) => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const navigate = useNavigate();
  const myNickname = localStorage.getItem('nickname');

  const onClickBack = () => {
    if (from === 'write') {
      navigate('/meet');
    } else {
      navigate(-1);
    }
  };

  const onClickChat = () => {
    localStorage.setItem('userToken', token);
    navigate(`/chat/private?title=${authorNickname}`);
  };

  return (
    <div className="flex items-center justify-between w-full h-[62px] px-5">
      <div className="cursor-pointer font-black" onClick={onClickBack}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <div className="flex gap-[20px]">
        {myNickname !== authorNickname && (
          <div className="cursor-pointer" onClick={onClickChat}>
            <LuSendHorizonal size={20} />
          </div>
        )}

        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
