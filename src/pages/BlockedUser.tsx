import Header from '../common/Header';
import User from '../common/User';

export default function BlockedUser() {
  return (
    <div className="h-full w-full flex flex-col">
      <Header title="차단 유저 목록" />
      <div className="py-3 px-[30px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel="차단 해제"
          buttonWidth="84px"
          onButtonClick={() => console.log('차단 해제 클릭됨')}
        />
      </div>
    </div>
  );
}
