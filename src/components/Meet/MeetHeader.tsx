import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { IoMap } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import SortOptions from './SortOptions';

interface MeetHeaderProps {
  sortBy: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE';
  setSortBy: (value: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE') => void;
}

const MeetHeader: React.FC<MeetHeaderProps> = ({ sortBy, setSortBy }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center px-5 h-[62px]">
        <div className="flex-1"></div>
        <h1 className="text-lg font-semibold flex-1 text-center">모임 찾기</h1>
        <div className="flex space-x-4 flex-1 justify-end">
          <FiSearch className="text-2xl cursor-pointer" onClick={() => navigate('/search/meet')} />
          <button>
            <FiBell size={24} onClick={() => navigate('/mynotification')} />
          </button>
        </div>
      </header>

      <div className="flex items-center  text-sm text-gray-600 border-b justify-between">
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />

        <button
          className="border border-gray-300 rounded-full px-3 py-1 flex items-center mr-4 mb-2"
          onClick={() => navigate('/Map')}
        >
          <IoMap className="w-4 h-4 mr-1 " />
          지도 뷰
        </button>
      </div>
    </>
  );
};

export default MeetHeader;
