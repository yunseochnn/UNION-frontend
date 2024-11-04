import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import SideBar from '../common/SideBar';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);

  const departments: { [key: string]: string } = {
    HUMANITIES: '인문사회',
    SCIENCES: '자연과학',
    ENGINEERING: '공학',
    ARTS: '예체능',
    MEDICINE: '의학',
  };

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

      <div className="flex flex-col flex-1 px-[15px]">
        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => navigate('/board/FREE')}
        >
          <span>자유 게시판</span>
          <FiChevronRight />
        </div>

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => setIsAcademicOpen(!isAcademicOpen)}
        >
          <span>학과 게시판</span>
          {isAcademicOpen ? <FiChevronDown /> : <FiChevronRight />}
        </div>

        {isAcademicOpen && (
          <div className="bg-gray-50">
            {Object.entries(departments).map(([key, value]) => (
              <div
                key={key}
                className="pl-8 py-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                onClick={() => navigate(`/board/${key}`)} // 경로 수정
              >
                <span>{value}</span>
                <FiChevronRight className="mr-4" />
              </div>
            ))}
          </div>
        )}

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => navigate('/board/MARKET')}
        >
          <span>장터 게시판</span>
          <FiChevronRight />
        </div>

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => navigate('/board/INFO')}
        >
          <span>정보 게시판</span>
          <FiChevronRight />
        </div>

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => navigate('/board/EMPLOYMENT')}
        >
          <span>추후 생각</span>
          <FiChevronRight />
        </div>
      </div>

      <footer className="h-14 w-full flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Board;
