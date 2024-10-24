import { useNavigate } from 'react-router-dom';
import Logo from '../components/SocialLogin/Logo';
import SocialButton from '../components/SocialLogin/SocialButton';

export default function SocialLogin() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col items-center justify-between px-[30px]">
      <div className="mt-[150px]">
        <Logo />
        <button onClick={() => navigate('/Home')}>홈</button>
      </div>
      <div className="space-y-3 flex flex-col items-center mb-[48px]">
        <SocialButton
          platform="Google"
          bgColor="bg-customWhite"
          textColor="text-black"
          logo="/google.svg"
          logoSize="w-5 h-5"
          iconMarginLeft="left-5"
        />
        <SocialButton
          platform="Kakao"
          bgColor="bg-customYellow"
          textColor="text-black"
          logo="/kakao.png"
          logoSize="w-6 h-6"
          iconMarginLeft="left-5"
        />
        <SocialButton
          platform="Naver"
          bgColor="bg-customGreen"
          textColor="text-white"
          logo="/n.png"
          logoSize="w-10 h-10"
        />
      </div>
    </div>
  );
}
