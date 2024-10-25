import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import VerificationInput from '../components/EmailVerification/VerificationInput';
import Button from '../components/EmailVerification/Button';
import Header from '../common/Header';
import Title from '../components/EmailVerification/Title';
import { userState } from '../recoil/userAtoms';
import { useEffect, useState } from 'react';

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userState);
  const [isVerified, setIsVerified] = useState(false);

  // URL에서 oauthUserToken 추출 후 전역 상태에 저장
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oauthUserToken = queryParams.get('oauthUserToken');

    if (oauthUserToken) {
      setUser(prevState => ({ ...prevState, oauthUserToken }));
    } else {
      alert('유효한 인증 토큰이 없습니다.');
      navigate('/'); // 없는 경우 홈으로
    }
  }, [location, setUser, navigate]);

  // 이메일 인증 완료 시 상태 업데이트
  const handleVerificationComplete = (email: string, univName: string) => {
    setIsVerified(true);
    setUser(prevState => ({ ...prevState, email, univName }));
  };

  // 인증 완료 시 프로필 페이지로
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
