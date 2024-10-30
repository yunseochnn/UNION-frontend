import React, { useState } from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { IoMap } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
interface MeetHeaderProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const MeetHeader: React.FC<MeetHeaderProps> = ({ sortBy, setSortBy }) => {
  const navigate = useNavigate(); // useNavigate hook 추가
  const [showSortOptions, setShowSortOptions] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div className="flex-1"></div>
        <h1 className="text-xl font-semibold flex-1 text-center">모임 찾기</h1>
        <div className="flex space-x-4 flex-1 justify-end">
          <FiSearch className="text-2xl" />
          <FiBell className="text-2xl" />
        </div>
      </header>

      <div className="flex flex-wrap gap-4 px-4 py-2 text-sm text-gray-600 border-b relative">
        <button
          className="flex items-center border border-gray-300 rounded-full px-3 py-1"
          onClick={() => setShowSortOptions(!showSortOptions)}
        >
          {sortBy} ▼
        </button>

        {/* 모집완료 버튼 추가했습니다 */}
        <button className="border border-gray-300 rounded-full px-3 py-1">모집 완료 글 보기</button>

        <button
          className="border border-gray-300 rounded-full px-3 py-1 flex items-center"
          onClick={() => navigate('/Map')} // 클릭 이벤트 추가
        >
          <IoMap className="w-4 h-4 mr-1" />
          지도 뷰
        </button>

        {showSortOptions && (
          <div className="absolute top-full left-4 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {['가까운거리순', '인기순', '최신순'].map(option => (
              <button
                key={option}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortBy(option);
                  setShowSortOptions(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MeetHeader;
