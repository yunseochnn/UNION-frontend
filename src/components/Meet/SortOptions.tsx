import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface SortOptionsProps {
  sortBy: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE';
  setSortBy: (value: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE') => void;
}

const sortByText = {
  LATEST: '최근 작성 순',
  DISTANCE: '가까운 거리 순',
  GATHERING_DATE: '가까운 일정 순',
};

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, setSortBy }) => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4 px-4 pb-2 text-sm text-gray-600  relative">
      <div className="relative">
        <button
          className="w-full flex items-center justify-start gap-2 border border-gray-300 rounded-full px-3 py-1"
          onClick={() => setShowSortOptions(!showSortOptions)}
        >
          <span className="text-left w-full">{sortByText[sortBy]}</span>
          <span>
            <IoIosArrowDown size={15} />
          </span>
        </button>

        {showSortOptions && (
          <div className="absolute top-[calc(100%+1px)] left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSortBy('LATEST');
                setShowSortOptions(false);
              }}
            >
              최근 작성 순
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSortBy('DISTANCE');
                setShowSortOptions(false);
              }}
            >
              가까운 거리 순
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSortBy('GATHERING_DATE');
                setShowSortOptions(false);
              }}
            >
              가까운 일정 순
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortOptions;
