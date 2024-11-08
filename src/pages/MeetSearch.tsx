import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchKeywordState } from '../recoil/searchState';
import MeetSearchResult from '../components/Search/MeetSearchResult';
import Header from '../components/Search/Header';
import Title from '../components/Search/Title';
import SortOptions from '../components/Meet/SortOptions';

export default function MeetSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'LATEST' | 'DISTANCE' | 'GATHERING_DATE'>('LATEST');
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
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {isSearching && searchKeyword ? <MeetSearchResult sortBy={sortBy} setSortBy={setSortBy} /> : <Title />}
    </div>
  );
}
