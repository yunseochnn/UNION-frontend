const ProfileList = () => {
  return (
    <div className="h-16 w-full flex justify-between items-center mt-2">
      <div className="flex items-center">
        <div className="h-14 w-14 rounded-full bg-gray-300"></div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <div className="font-bold text-base">찐 감자</div>
            <div className="font-semibold text-xs text-gray-400">구름대학교</div>
          </div>
          <div className="font-semibold text-sm text-gray-400">한 줄 자기 소개가 들어갑니다!</div>
        </div>
      </div>
      <div
        className="w-20 h-7 rounded-full text-white flex items-center justify-center font-semibold text-sm cursor-pointer"
        style={{ backgroundColor: '#ff4a4d' }}
      >
        강퇴하기
      </div>
    </div>
  );
};

export default ProfileList;
