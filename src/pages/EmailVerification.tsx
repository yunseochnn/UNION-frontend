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

  const handleVerificationComplete = (inputUnivName: string) => {
    setIsVerified(true);
    setUnivName(inputUnivName);
  };

  const handleNextPage = () => {
    if (isVerified) {
      setUser(prevState => ({ ...prevState, univName }));
      navigate('/profile');
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
