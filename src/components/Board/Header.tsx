// components/Board/Header.tsx
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { FiSearch, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center flex-1">
        <IoChevronBack size={24} className="cursor-pointer" onClick={() => navigate('/board')} />
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
