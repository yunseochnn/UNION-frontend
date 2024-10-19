import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';

export default function UserInfo() {
  return (
    <div className="h-full w-full flex flex-col relative ">
      <Header title="유저 정보" />
      <div className="px-[36px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel="차단 하기"
          buttonWidth="84px"
          onButtonClick={() => console.log('차단 하기 클릭됨')}
        />
      </div>

      <UserTabs />
    </div>
  );
}
