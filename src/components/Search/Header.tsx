// Header.tsx
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';

interface HeaderProps {
  onSearch: (keyword: string) => void;
  onFocus?: () => void;
  onInputChange: () => void;
  sortType?: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE'; // sortType 추가
  onSortChange?: (type: 'LATEST' | 'DISTANCE' | 'GATHERING_DATE') => void; // onSortChange 추가
}

const sortByText = {
  LATEST: '최신순',
  DISTANCE: '가까운 거리 순',
  GATHERING_DATE: '모임순',
};

const Header: React.FC<HeaderProps> = ({ onSearch, onFocus, onInputChange, sortType, onSortChange }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black mr-[15px]" onClick={handleBackClick}>
        <IoIosArrowBack size={32} />
      </div>
      <SearchInput onSearch={onSearch} onFocus={onFocus} onInputChange={onInputChange} />

      {/* 정렬 옵션 */}
      {onSortChange && (
        <div className="ml-auto mr-5 relative">
          <button
            className="border border-gray-300 rounded-full px-3 py-1 text-sm"
            onClick={() => onSortChange(sortType === 'LATEST' ? 'DISTANCE' : 'LATEST')}
          >
            {sortByText[sortType ?? 'LATEST']}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
