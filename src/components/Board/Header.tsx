// components/Board/Header.tsx
import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-5 h-[62px]">
      <div className="flex items-center flex-1">
        <IoIosArrowBack size={32} className="cursor-pointer" onClick={() => navigate('/board')} />
      </div>
      <h1 className="flex-1 text-center text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <FiSearch size={24} />
        <FiBell size={24} />
      </div>
    </header>
  );
};

export default Header;
