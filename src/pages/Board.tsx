import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import SideBar from '../common/SideBar';
import { useSetRecoilState } from 'recoil';
import { boardTypeState } from '../recoil/searchState';

const Board: React.FC = () => {
  const navigate = useNavigate();
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const setBoardType = useSetRecoilState(boardTypeState);

  const departments: { [key: string]: string } = {
    HUMANITIES: '인문사회',
    SCIENCES: '자연과학',
    ENGINEERING: '공학',
    ARTS: '예체능',
    MEDICINE: '의학',
  };

  const handleSearchClick = () => {
    setBoardType('ALL');
    navigate(`/search/ALL`);
  };

  const handleBoardClick = (type: string) => {
    setBoardType(type);
    navigate(`/board/${type}`);
  };

  return (
    <div className="center-content flex flex-col bg-white h-screen">
      <header className="flex justify-between items-center h-[62px] px-5">
        <div className="flex-1"></div>
        <h1 className="text-lg font-semibold flex-1 text-center">게시판</h1>
        <div className="flex space-x-4 flex-1 justify-end">
          <button onClick={handleSearchClick} className="cursor-pointer" aria-label="검색">
            <FiSearch size={24} />
          </button>
          <button className="cursor-pointer" aria-label="알림">
            <FiBell size={24} />
          </button>
        </div>
      </header>

      <div className="w-full aspect-video flex items-center justify-center">
        <img
          src={'https://union-image-bucket.s3.ap-northeast-2.amazonaws.com/banner/ad_banner.png'}
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-col flex-grow px-[15px] overflow-y-auto hidden-scrollbar flex-1">
        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => handleBoardClick('FREE')}
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
                onClick={() => handleBoardClick(key)}
              >
                <span>{value}</span>
                <FiChevronRight className="mr-4" />
              </div>
            ))}
          </div>
        )}

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => handleBoardClick('MARKET')}
        >
          <span>장터 게시판</span>
          <FiChevronRight />
        </div>

        <div
          className="p-4 border-b cursor-pointer flex justify-between items-center hover:bg-gray-50"
          onClick={() => handleBoardClick('INFO')}
        >
          <span>정보 게시판</span>
          <FiChevronRight />
        </div>
      </div>

      <footer className="h-20 w-full flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
};

export default Board;
