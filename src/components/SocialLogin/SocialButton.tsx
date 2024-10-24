const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
      window.location.href = `${VITE_API_BASE_URL}/oauth2/authorization/naver`;
    } else if (platform === 'Google') {
      window.location.href = `${VITE_API_BASE_URL}/oauth2/authorization/google`;
    } else if (platform === 'Kakao') {
      window.location.href = `${VITE_API_BASE_URL}/oauth2/authorization/kakao`;
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
