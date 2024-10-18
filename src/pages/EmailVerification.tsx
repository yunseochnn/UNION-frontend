import Title from '../components/EmailVerification/Title';
import VerificationInput from '../components/EmailVerification/VerificationInput';
import Header from '../components/Header';

export default function EmailVerification() {
  return (
    <div className="px-[37px] font-semibold">
      <Header />
      <Title />
      <VerificationInput />
    </div>
  );
}
