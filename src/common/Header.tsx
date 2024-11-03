import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  navigateTo?: string;
  onBack?: () => void;
}

export default function Header({ title, navigateTo, onBack }: HeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (navigateTo) {
      navigate(navigateTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black" onClick={handleBackClick}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-semibold">{title}</div>
    </div>
  );
}
