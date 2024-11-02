import Logo from '../components/SocialLogin/Logo';
import SocialButton from '../components/SocialLogin/SocialButton';

export default function SocialLogin() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between relative">
      <div className="absolute top-[36%] transform -translate-y-1/2">
        <Logo />
      </div>
      <div className="absolute top-[82%] transform -translate-y-1/2 space-y-3 flex flex-col items-center  w-full px-[30px] mb-[48px]">
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
