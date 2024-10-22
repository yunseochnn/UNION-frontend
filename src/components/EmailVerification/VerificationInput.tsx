import { useState, useEffect, useRef } from 'react';

export default function VerificationInput() {
  const [universities, setUniversities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); // 학교정보 JSON 파일 불러옴
  const dropdownRef = useRef<HTMLUListElement>(null);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/univ.json');
      const data = await response.json();
      const universityNames = data.records
        .map((record: { 학교명: string }) => record.학교명)
        .filter((name: string) => !name.includes('대학원'));
      setUniversities(universityNames);
      setHasFetched(true);
    } catch (error) {
      console.error('학교 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== '' && !hasFetched) {
      fetchUniversities();
    }

    if (hasFetched) {
      const filtered = universities.filter(name => name.toLowerCase().includes(value.toLowerCase()));
      setFilteredUniversities(filtered);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const startTimer = () => {
    setIsCodeRequested(true);
    setTimeLeft(300);
  };

  useEffect(() => {
    if (timeLeft > 0 && isCodeRequested) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, isCodeRequested]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleUniversitySelect = (university: string) => {
    setSearchTerm(university);
    setFilteredUniversities([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFilteredUniversities([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="font-semibold">
      <div className="mt-[100px]">
        <div className="mt-6 border-b-[1.3px] border-customGray">
          <label htmlFor="university-search" className="text-[15px] text-left block">
            학교 이름
          </label>
          <input
            type="text"
            id="university-search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="대학교 이름을 검색 후 선택하세요"
            className="font-normal text-[15px] placeholder-gray-400 focus:outline-none p-2 w-full mt-2"
          />
          {filteredUniversities.length > 0 && (
            <ul ref={dropdownRef} className="mt-2 border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredUniversities.map((university, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer font-normal"
                  onClick={() => handleUniversitySelect(university)}
                >
                  {university}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mt-6 text-[15px] text-left block">
            이메일
          </label>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              placeholder="학교 이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              className="font-normal text-[15px] border-b-[1.3px] border-customGray placeholder-gray-400 focus:outline-none p-2 w-full mt-2"
            />
            <button
              className="cursor-pointer text-[14px] px-3 py-2 ml-2 bg-mainColor text-white rounded-md whitespace-nowrap"
              onClick={startTimer}
              disabled={!(searchTerm && email)}
            >
              인증 요청
            </button>
          </div>
        </div>

        <div className="mt-6 border-b-[1.3px] border-customGray">
          <label htmlFor="verification" className="text-[15px] text-left block">
            인증번호
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="verification"
              placeholder="인증번호를 입력해주세요"
              className="font-normal text-[15px] placeholder-gray-400 focus:outline-none p-2 w-full mt-2"
            />
            {timeLeft > 0 && <span className="text-mainColor mr-2">{formatTime(timeLeft)}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
