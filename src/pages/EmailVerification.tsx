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

  const [email, setEmail] = useState('');
  const [univName, setUnivName] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oauthUserToken = queryParams.get('oauthUserToken');

    if (oauthUserToken) {
      setUser(prevState => ({ ...prevState, oauthUserToken }));

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
      navigate('/');
    }
  }, [location, setUser, navigate]);

  // VerificationInput에서만 로컬 상태를 업데이트
  const handleVerificationComplete = (inputEmail: string, inputUnivName: string) => {
    setIsVerified(true);
    setEmail(inputEmail);
    setUnivName(inputUnivName);
  };

  // 버튼 클릭 시 전역 상태 업데이트
  const handleNextPage = () => {
    if (isVerified) {
      setUser(prevState => ({ ...prevState, email, univName }));
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
