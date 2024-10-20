import React, { useState } from 'react';
import { FiSearch, FiBell, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';

interface BoardCategory {
  id: string;
  name: string;
  hasArrow?: boolean;
  subCategories?: string[];
}

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);

  const categories: BoardCategory[] = [
    { id: 'free', name: '자유 게시판', hasArrow: true },
    {
      id: 'academic',
      name: '학과 게시판',
      hasArrow: true,
      subCategories: ['인문사회', '자연과학', '공학', '예체능', '의학'],
    },
    { id: 'market', name: '장터 게시판', hasArrow: true },
    { id: 'info', name: '정보 게시판', hasArrow: true },
    { id: 'employment', name: '쭉 생각해보자.. 게시판', hasArrow: true },
  ];

  return (
    <div className="center-content flex flex-col bg-white">
      <header className="flex justify-between items-center p-4">
        <div className="flex-1"></div>
        <h1 className="text-xl font-semibold flex-1 text-center">게시판</h1>
        <div className="flex space-x-4 flex-1 justify-end">
          <FiSearch size={24} />
          <FiBell size={24} />
        </div>
      </header>

      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
        <div className="w-20 h-20 bg-white" />
      </div>

      <div className="flex flex-col">
        {categories.map(category => (
          <div key={category.id}>
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => {
                if (category.id === 'academic') {
                  setIsAcademicOpen(!isAcademicOpen);
                } else {
                  navigate(`/Board/${category.id}`);
                }
              }}
            >
              <span>{category.name}</span>
              {category.hasArrow &&
                (category.id === 'academic' ? (
                  isAcademicOpen ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )
                ) : (
                  <FiChevronRight />
                ))}
            </div>
            {category.id === 'academic' && isAcademicOpen && (
              <div className="bg-gray-50">
                {category.subCategories?.map(subCategory => (
                  <div
                    key={subCategory}
                    className="pl-8 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/Board/academic/${subCategory}`)}
                  >
                    {subCategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-auto border-t">
        <div className="flex justify-center">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Board;
