import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchKeywordState } from '../recoil/searchState';
import MeetSearchResult from '../components/Search/MeetSearchResult';
import Header from '../components/Search/Header';
import Title from '../components/Search/Title';

export default function MeetSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const searchKeyword = useRecoilValue(searchKeywordState);
  const setSearchKeyword = useSetRecoilState(searchKeywordState);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearching(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header onSearch={handleSearch} onInputChange={() => setIsSearching(false)} />
      </div>
      {isSearching && searchKeyword ? <MeetSearchResult /> : <Title />}
    </div>
  );
}
