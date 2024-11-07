import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';

interface SearchInputProps {
  onSearch: (keyword: string) => void;
  onFocus?: () => void;
  onInputChange: () => void;
}

export default function SearchInput({ onSearch, onFocus, onInputChange }: SearchInputProps) {
  const [keyword, setKeyword] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <div className="flex items-center bg-[#F2F4F8] rounded-lg p-2 w-[75%] h-[41px] ">
      <IoSearch className="text-[#697077] text-[24px] ml-[8px]" onClick={() => onSearch(keyword)} />
      <input
        type="text"
        placeholder="글 제목, 내용"
        className="bg-[#F2F4F8] text-[#697077] focus:outline-none w-full pl-[10px]"
        value={keyword}
        onChange={e => {
          setKeyword(e.target.value);
          onInputChange(); // input 값 변경 시 초기 화면으로 이동
        }}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
      />
    </div>
  );
}
