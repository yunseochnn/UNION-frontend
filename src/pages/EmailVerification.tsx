import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import VerificationInput from '../components/EmailVerification/VerificationInput';
import Button from '../components/EmailVerification/Button';
import Header from '../common/Header';
import Title from '../components/EmailVerification/Title';
import { userState } from '../recoil/userAtoms';
import { useEffect, useState } from 'react';

const PHOTO_URL = '/oauth/photo';

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userState);
  const [isVerified, setIsVerified] = useState(false);

  // URL에서 oauthUserToken 추출 후 전역 상태에 저장하고 프로필 이미지 가져오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oauthUserToken = queryParams.get('oauthUserToken');

    if (oauthUserToken) {
      // 전역 상태에 oauthUserToken 저장
      setUser(prevState => ({ ...prevState, oauthUserToken }));

      // 프로필 이미지 GET 요청
      fetch(`${PHOTO_URL}?oauthUserToken=${oauthUserToken}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('프로필 이미지를 가져오지 못했습니다.');
          }
          return response.text();
        })
        .then(url => {
          setUser(prevState => ({ ...prevState, profileImage: url }));
        })
        .catch(error => {
          console.error('Failed to fetch profile image:', error);
          alert('프로필 이미지를 가져오지 못했습니다.');
        });
    } else {
      alert('유효한 인증 토큰이 없습니다.');
      navigate('/'); // 없는 경우 홈으로 이동
    }
  }, [location, setUser, navigate]);

  const handleVerificationComplete = (email: string, univName: string) => {
    setIsVerified(true);
    setUser(prevState => ({ ...prevState, email, univName }));
  };

  const handleNextPage = () => {
    if (isVerified) {
      navigate('/Profile');
    }
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="" navigateTo="/" />
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
