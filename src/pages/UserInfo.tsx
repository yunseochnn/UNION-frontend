import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';
import { useRecoilState } from 'recoil';
import { blockedUserState } from '../recoil/blockedUserState';

export default function UserInfo() {
  const [isBlocked, setIsBlocked] = useRecoilState(blockedUserState);

  const handleBlockToggle = () => {
    setIsBlocked(prev => !prev);
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="유저 정보" navigateTo="/Mypage" />
      <div className="px-[36px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel={isBlocked ? '차단 해제' : '차단 하기'}
          buttonWidth="84px"
          onButtonClick={handleBlockToggle}
        />
      </div>

      <UserTabs />
    </div>
  );
}
