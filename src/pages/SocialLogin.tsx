import Logo from '../components/SocialLogin/Logo';
import SocialButton from '../components/SocialLogin/SocialButton';

export default function SocialLogin() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between px-[30px]">
      <div className="mt-[150px]">
        <Logo />
      </div>
      <div className="space-y-3 flex flex-col items-center mb-[48px]">
        <SocialButton
          platform="Google"
          bgColor="bg-customWhite"
          textColor="text-black"
          logo="/public/google.svg"
          logoSize="w-5 h-5"
          iconMarginLeft="left-5"
        />
        <SocialButton
          platform="Kakao"
          bgColor="bg-customYellow"
          textColor="text-black"
          logo="/public/kakao.png"
          logoSize="w-6 h-6"
          iconMarginLeft="left-5"
        />
        <SocialButton
          platform="Naver"
          bgColor="bg-customGreen"
          textColor="text-white"
          logo="/public/n.png"
          logoSize="w-10 h-10"
        />
      </div>
    </div>
  );
}
