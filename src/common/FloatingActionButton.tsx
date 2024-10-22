import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 text-white rounded-full p-4 shadow-lg flex items-center justify-center" // 값을 더 크게 조정
      style={{ backgroundColor: '#ff4a4d' }}
    >
      <FiPlus size={24} />
    </button>
  );
};

export default FloatingActionButton;
