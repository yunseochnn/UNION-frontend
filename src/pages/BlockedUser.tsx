import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import User from '../common/User';
import { blockedUserState } from '../recoil/blockedUserState';
import { useNavigate } from 'react-router-dom';

export default function BlockedUser() {
  const [isBlocked, setIsBlocked] = useRecoilState(blockedUserState);
  const navigate = useNavigate();

  const handleBlockToggle = () => {
    setIsBlocked(prev => !prev);
  };
  const handleUserClick = () => {
    navigate('/userinfo');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10 ">
        <Header title="차단 유저 목록" navigateTo="/Mypage" />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        <div className="py-3 px-[30px]" onClick={handleUserClick}>
          <User
            name="찐 감자"
            university="구름대학교"
            bio="한 줄 자기 소개가 들어갑니다!"
            buttonLabel={isBlocked ? '차단 하기' : '차단 해제'}
            buttonWidth="84px"
            onButtonClick={handleBlockToggle}
          />
          <User
            name="찐 감자"
            university="구름대학교"
            bio="한 줄 자기 소개가 들어갑니다!"
            buttonLabel={isBlocked ? '차단 하기' : '차단 해제'}
            buttonWidth="84px"
            onButtonClick={handleBlockToggle}
          />
        </div>
      </div>
    </div>
  );
}
