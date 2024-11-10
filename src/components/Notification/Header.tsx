import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center p-4 border-b">
      <button onClick={() => navigate(-1)} className="mr-4">
        <IoChevronBack size={24} />
      </button>
      <h1 className="text-xl font-semibold flex-1 text-center mr-8">{title}</h1>
    </header>
  );
};

export default Header;
