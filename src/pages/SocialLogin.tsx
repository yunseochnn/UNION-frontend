import { useNavigate } from 'react-router-dom';
import Logo from '../components/SocialLogin/Logo';
import SocialButton from '../components/SocialLogin/SocialButton';
import Cookies from 'js-cookie';

export default function SocialLogin() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col items-center justify-between relative">
      <div className="absolute top-[36%] transform -translate-y-1/2">
        <Logo />
      </div>

      {/* 임시 토큰 저장 */}
      <div>
        <div
          onClick={() => {
            Cookies.set(
              'Authorization',
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU1MywiZXhwIjoxNzMyNDMxNTUzLCJzdWIiOiJ0b2tlbjIifQ.ZaPrshyDPwJ2zmENewdFlmYpjZnmCilm5VLHOaFs3lA',
              { path: '/' },
            );
            localStorage.setItem('nickname', 'user2nick');
            navigate('/home');
          }}
        >
          user2로 로그인
        </div>
        <div
          onClick={() => {
            Cookies.set(
              'Authorization',
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTYyNywiZXhwIjoxNzMyNDMxNjI3LCJzdWIiOiJ0b2tlbjUifQ.H3eeEpUh36KsS73cuQBzlPPSddiKIfGuTvsEQX6FFL8',
              { path: '/' },
            );
            localStorage.setItem('nickname', 'user5nick');
            navigate('/home');
          }}
        >
          user5로 로그인
        </div>
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
