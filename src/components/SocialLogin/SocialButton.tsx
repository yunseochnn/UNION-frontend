const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID || '';
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI || '';
const STATE = Math.random().toString(36).substring(2);

interface SocialButtonProps {
  platform: string;
  bgColor: string;
  textColor: string;
  logo: string;
  logoSize?: string;
  fontSize?: string;
  iconMarginLeft?: string;
}
export default function SocialButton({
  platform,
  bgColor,
  textColor,
  logo,
  logoSize = 'w-6 h-6',
  fontSize = 'text-[18px]',
  iconMarginLeft = 'left-3',
}: SocialButtonProps) {
  const handleButtonClick = () => {
    if (platform === 'Naver') {
      const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE}`;
      window.location.href = NAVER_AUTH_URL;
    } else if (platform === 'Google') {
      // 구글 로그인 URL 처리
    } else if (platform === 'Kakao') {
      // 카카오 로그인 URL 처리
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      className={`w-[380px] h-[63px] ${bgColor} ${textColor} rounded-md shadow-md flex items-center justify-center relative`}
    >
      <img src={logo} alt={`${platform} logo`} className={`${logoSize} absolute ${iconMarginLeft}`} />
      <div className={`flex-grow text-center ${fontSize}`}>{platform}로 시작하기</div>
    </button>
  );
}
