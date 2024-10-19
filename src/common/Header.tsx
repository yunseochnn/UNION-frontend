import { IoIosArrowBack } from 'react-icons/io';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="relative flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black" onClick={handleBack}>
        <IoIosArrowBack size={32} />
      </div>
      {title && <div className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-semibold">{title}</div>}
    </div>
  );
}
