import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import VerificationInput from '../components/EmailVerification/VerificationInput';
import Button from '../components/EmailVerification/Button';
import Header from '../common/Header';
import Title from '../components/EmailVerification/Title';
import { userState } from '../recoil/userAtoms';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const PHOTO_URL = '/oauth/photo';

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userState);
  const [isVerified, setIsVerified] = useState(false);
  const [univName, setUnivName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oauthUserToken = queryParams.get('oauthUserToken');

    if (oauthUserToken) {
      setUser(prevState => ({ ...prevState, oauthUserToken }));

      apiClient
        .get(`${PHOTO_URL}?oauthUserToken=${oauthUserToken}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        .then(response => {
          setUser(prevState => ({ ...prevState, profileImage: response.data }));
        })
        .catch(error => {
          console.error('Failed to fetch profile image:', error);
          alert('프로필 이미지를 가져오지 못했습니다.');
        });
    } else {
      alert('유효한 인증 토큰이 없습니다.');
      navigate('/');
    }
  }, [location, setUser, navigate]);

  const handleVerificationComplete = (data: { university: string; email: string }) => {
    setIsVerified(true);
    setUnivName(data.university);
    setEmail(data.email);
  };

  const handleNextPage = () => {
    if (isVerified) {
      setUser(prevState => ({ ...prevState, univName }));
      // 특정 유저의 이메일 인증 초기화 요청
      fetch(`https://univcert.com/api/v1/clear/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: import.meta.env.VITE_UNIV_API_KEY,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('이메일 인증이 초기화되었습니다.');
            navigate('/profile');
          } else {
            alert('이메일 인증 초기화에 실패했습니다.');
          }
        })
        .catch(error => {
          console.error('인증 초기화 오류:', error);
          alert('서버와의 통신 중 오류가 발생했습니다.');
        });
    }
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="" />
      <div className="px-[36px] flex-grow">
        <Title />
        <VerificationInput onVerificationComplete={handleVerificationComplete} />
        <div className="absolute bottom-[48px] left-0 right-0 px-[30px]">
          <Button onClick={handleNextPage} disabled={!isVerified} label="다음" />
        </div>
      </div>
    </div>
  );
}
