import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { boardTypeState, searchKeywordState } from '../recoil/searchState';
import Header from '../components/Search/Header';
import Title from '../components/Search/Title';
import SearchResults from '../components/Search/SearchResult';
import { useParams } from 'react-router-dom';

export default function Search() {
  const { boardType } = useParams<{ boardType: string }>();
  const [isSearching, setIsSearching] = useState(false);
  const searchKeyword = useRecoilValue(searchKeywordState);
  const setSearchKeyword = useSetRecoilState(searchKeywordState);
  const setBoardType = useSetRecoilState(boardTypeState);

  useEffect(() => {
    if (boardType) {
      setBoardType(boardType);
    }
  }, [boardType, setBoardType]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearching(true);
  };

  const handleInputChange = () => {
    setIsSearching(false); // input 값 변경 시 초기 화면으로 전환
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header onSearch={handleSearch} onInputChange={handleInputChange} />
      </div>
      {isSearching && searchKeyword ? <SearchResults /> : <Title />}
    </div>
  );
}
