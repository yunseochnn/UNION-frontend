import React, { useState } from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMap } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface MeetHeaderProps {
  sortBy: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE';
  setSortBy: (value: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE') => void;
}

const sortByText = {
  LATEST: '최신순',
  DISTANCE: '가까운거리순',
  GATHERING_DATE: '모임순',
};

const MeetHeader: React.FC<MeetHeaderProps> = ({ sortBy, setSortBy }) => {
  const navigate = useNavigate();
  const [showSortOptions, setShowSortOptions] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-5 h-[62px]">
        <div className="flex-1"></div>
        <h1 className="text-lg font-semibold flex-1 text-center">모임 찾기</h1>
        <div className="flex space-x-4 flex-1 justify-end">
          <FiSearch className="text-2xl cursor-pointer" onClick={() => navigate('/search/meet')} />
          <FiBell className="text-2xl" />
        </div>
      </header>

      {/* 전체 컨테이너 */}
      <div className="flex flex-wrap items-center px-4 pb-2 text-sm text-gray-600 border-b relative justify-between">
        {/* 정렬 버튼과 드롭다운을 위한 컨테이너 */}
        <div className="relative">
          <button
            className="w-30 flex items-center justify-center gap-2 border border-gray-300 rounded-full px-3 py-1"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <span>{sortByText[sortBy]}</span>
            <span>
              <IoIosArrowDown size={15} />
            </span>
          </button>

          {/* 드롭다운 메뉴 */}
          {showSortOptions && (
            <div className="absolute top-[calc(100%+1px)] left-0 z-10 w-28 bg-white border border-gray-300 rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortBy('DISTANCE');
                  setShowSortOptions(false);
                }}
              >
                거리순
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortBy('LATEST');
                  setShowSortOptions(false);
                }}
              >
                최신순
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSortBy('GATHERING_DATE');
                  setShowSortOptions(false);
                }}
              >
                모임순
              </button>
            </div>
          )}
        </div>

        <button
          className="border border-gray-300 rounded-full px-3 py-1 flex items-center"
          onClick={() => navigate('/Map')}
        >
          <IoMap className="w-4 h-4 mr-1" />
          지도 뷰
        </button>
      </div>
    </>
  );
};
export default MeetHeader;
