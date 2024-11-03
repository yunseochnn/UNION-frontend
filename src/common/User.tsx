export interface UserProps {
  token?: string;
  name: string;
  university: string;
  bio: string;
  profileImage: string;
  buttonLabel: string;
  buttonWidth: string;
  blocked: boolean;
  onClick?: () => void; // 유저 정보 클릭 이벤트
  onButtonClick: (token?: string) => void; // 차단 버튼 클릭 이벤트
}

export default function User({
  token,
  name,
  university,
  bio,
  profileImage,
  buttonLabel,
  buttonWidth,
  onClick,
  onButtonClick,
}: UserProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="h-16 w-full flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src={profileImage} alt="프로필 이미지" className="h-14 w-14 rounded-full object-cover bg-gray-300" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <div className="font-bold text-base">{name}</div>
              <div className="font-semibold text-xs text-customGray2">{university}</div>
            </div>
            <div className="font-semibold text-sm text-customGray2">{bio}</div>
          </div>
        </div>
        <button
          className="h-7 rounded-full text-white flex items-center justify-center font-semibold text-sm cursor-pointer bg-mainColor"
          style={{ width: buttonWidth }}
          onClick={event => {
            event.stopPropagation();
            if (onButtonClick) onButtonClick(token); // token이 있을 때만 전달
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
