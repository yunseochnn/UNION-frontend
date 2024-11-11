import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface VerificationInputProps {
  onVerificationComplete: (data: { university: string; email: string }) => void;
}

export default function VerificationInput({ onVerificationComplete }: VerificationInputProps) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [universities, setUniversities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<string[]>([]);
  const [isUniversityValid, setIsUniversityValid] = useState<boolean | null>(null);
  const [isResend, setIsResend] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const API_KEY = import.meta.env.VITE_UNIV_API_KEY;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value);

  const handleUniversityCheck = () => {
    fetch('https://univcert.com/api/v1/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ univName: searchTerm }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsUniversityValid(true);
          toast.success('올바른 학교입니다.');
        } else {
          setIsUniversityValid(false);
          toast.error('올바르지 않은 학교입니다.');
        }
      })
      .catch(() => {
        setIsUniversityValid(false);
        toast.error('학교 확인 중 오류가 발생했습니다.');
      });
  };

  const handleVerificationRequest = () => {
    fetch('https://univcert.com/api/v1/certify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
        email: email,
        univName: searchTerm,
        univ_check: true,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success('인증번호가 이메일로 전송되었습니다.');
          setIsResend(true);
        } else {
          toast.error('인증번호 전송에 실패했습니다.');
        }
      })
      .catch(() => {
        toast.error('인증번호 전송 중 오류가 발생했습니다.');
      });
  };

  // 특정 유저 인증 초기화 및 재전송
  const handleResendVerification = () => {
    fetch(`https://univcert.com/api/v1/clear/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          handleVerificationRequest();
        } else {
          toast.error('실패했습니다.');
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
        toast.error('서버와의 통신 중 오류가 발생했습니다.');
      });
  };

  const handleVerificationSubmit = () => {
    fetch('https://univcert.com/api/v1/certifycode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
        email: email,
        univName: searchTerm,
        code: verificationCode,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('인증번호 확인에 실패했습니다.');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          toast.success('인증번호가 확인되었습니다.');
          onVerificationComplete({ university: searchTerm, email });
        } else {
          toast.error('인증번호가 올바르지 않습니다.');
        }
      })
      .catch(error => {
        toast.error(`인증번호 확인 중 오류가 발생했습니다: ${error.message}`);
      });
  };

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/univ.json');
      const data = await response.json();
      const universityNames = data.records
        .map((record: { 학교명: string }) => record.학교명)
        .filter((name: string) => !name.includes('대학원'));
      setUniversities(universityNames);
    } catch (error) {
      console.error('학교 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== '') {
      fetchUniversities();
      const filtered = universities.filter(name => name.toLowerCase().includes(value.toLowerCase()));
      setFilteredUniversities(filtered);
    }
  };

  const clearCertifiedUsers = () => {
    fetch('https://univcert.com/api/v1/clear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('인증된 유저 목록이 초기화되었습니다.');
        } else {
          alert('초기화에 실패했습니다. 서버 응답: ' + data.message);
        }
      })
      .catch(error => {
        console.error('목록 초기화 중 오류 발생:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      });
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
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="font-semibold">
        <div className="mt-[100px]">
          <div className="relative">
            <label htmlFor="university-search" className="text-[15px] text-left block">
              학교 이름
            </label>
            <div className="flex items-center relative w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  id="university-search"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="대학교 이름을 검색 후 선택하세요"
                  className="font-normal text-[15px] border-b-[1.3px] border-customGray placeholder-customGray2 focus:outline-none p-2 w-full mt-2"
                  autoComplete="off"
                />
                {filteredUniversities.length > 0 && (
                  <ul
                    ref={dropdownRef}
                    className="absolute border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto bg-white z-10"
                    style={{ width: '100%' }}
                  >
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
              <button
                className="cursor-pointer text-[14px] px-3 py-2 ml-2 bg-mainColor text-white rounded-md whitespace-nowrap"
                onClick={handleUniversityCheck}
              >
                이름 확인
              </button>
            </div>
            {isUniversityValid === false && <p className="text-red-500 text-sm mt-2">올바르지 않은 학교 이름입니다.</p>}
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="text-[15px] text-left block">
              이메일
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                placeholder="학교 이메일을 입력해주세요"
                value={email}
                onChange={handleEmailChange}
                className="font-normal text-[15px] border-b-[1.3px] border-customGray placeholder-customGray2 focus:outline-none p-2 w-full mt-2"
              />
              <button
                className="cursor-pointer text-[14px] px-3 py-2 ml-2 bg-mainColor text-white rounded-md whitespace-nowrap"
                onClick={isResend ? handleResendVerification : handleVerificationRequest}
                disabled={!(searchTerm && email && isUniversityValid)}
              >
                {isResend ? '재전송' : '인증 요청'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="verification" className="text-[15px] text-left block">
              인증번호
            </label>
            <div className="flex items-center">
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  id="verification"
                  placeholder="인증번호를 입력해주세요"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  className="font-normal text-[15px] border-b-[1.3px] border-customGray placeholder-customGray2 focus:outline-none p-2 w-full pr-16 mt-2"
                />
              </div>
              <button
                className="cursor-pointer text-[14px] px-3 py-2 ml-2 bg-mainColor text-white rounded-md whitespace-nowrap"
                onClick={handleVerificationSubmit}
                disabled={!verificationCode}
              >
                인증 완료
              </button>
            </div>
            <button onClick={clearCertifiedUsers}>인증 리스트 초기화</button>
          </div>
        </div>
      </div>
    </div>
  );
}
