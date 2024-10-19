import Header from '../common/Header';
import Button from '../components/EmailVerification/Button';

import Title from '../components/EmailVerification/Title';
import VerificationInput from '../components/EmailVerification/VerificationInput';

export default function EmailVerification() {
  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="" />
      <div className="px-[36px] flex-grow">
        <Title />
        <VerificationInput />
        <div className="absolute bottom-[48px] left-0 right-0 px-[30px]">
          <Button />
        </div>
      </div>
    </div>
  );
}
