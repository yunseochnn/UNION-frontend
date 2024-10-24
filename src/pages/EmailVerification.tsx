import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Button from '../components/EmailVerification/Button';
import Title from '../components/EmailVerification/Title';
import VerificationInput from '../components/EmailVerification/VerificationInput';
import { useState } from 'react';

export default function EmailVerification() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationComplete = () => {
    setIsVerified(true);
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
