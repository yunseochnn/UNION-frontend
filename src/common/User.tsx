interface UserProps {
  name: string;
  university: string;
  bio: string;
  profileImage: string;
  buttonLabel: string;
  buttonWidth: string;
  onButtonClick: () => void;
}

export default function User({
  name,
  university,
  bio,
  profileImage,
  buttonLabel,
  buttonWidth,
  onButtonClick,
}: UserProps) {
  return (
    <div>
      <div className="h-16 w-full flex justify-between items-center mt-2 cursor-pointer">
        <div className="flex items-center">
          <img src={profileImage} alt="프로필 이미지" className="h-14 w-14 rounded-full object-cover bg-gray-300" />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <div className="font-bold text-base">{name}</div>
              <div className="font-semibold text-xs text-gray-400">{university}</div>
            </div>
            <div className="font-semibold text-sm text-gray-400">{bio}</div>
          </div>
        </div>
        <button
          className="h-7 rounded-full text-white flex items-center justify-center font-semibold text-sm cursor-pointer"
          style={{ width: buttonWidth, backgroundColor: '#ff4a4d' }}
          onClick={event => {
            event.stopPropagation();
            onButtonClick();
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
