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
  return (
    <button
      className={`w-[380px] h-[63px] ${bgColor} ${textColor} rounded-md shadow-md flex items-center justify-center relative`}
    >
      <img src={logo} alt={`${platform} logo`} className={`${logoSize} absolute ${iconMarginLeft}`} />
      <div className={`flex-grow text-center ${fontSize}`}>{platform}로 시작하기</div>
    </button>
  );
}
