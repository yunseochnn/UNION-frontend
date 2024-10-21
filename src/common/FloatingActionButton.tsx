import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white rounded-full p-4 shadow-lg fixed bottom-16 right-6 z-50"  // 값을 더 크게 조정
    >
      <FiPlus size={24} />
    </button>
  );
};

export default FloatingActionButton;
