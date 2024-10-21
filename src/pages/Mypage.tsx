import LogoutBtn from '../components/Mypage/LogoutBtn';
import MyCalendar from '../components/Mypage/MyCalendar';
import MypageMenuList from '../components/Mypage/MypageMenuList';
import Title from '../components/Mypage/Title';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Profile/Footer';
import User from '../common/User';
import { useNavigate } from 'react-router-dom';

export default function Mypage() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col">
      {/* Title 부분을 sticky로 설정 */}
      <div className="sticky top-0 z-10 bg-white">
        <Title />
      </div>

      {/* 나머지 내용에 대해 스크롤 가능하도록 설정 */}
      <div className="flex flex-col flex-grow overflow-y-auto px-[36px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel="내 정보 수정"
          buttonWidth="100px"
          onButtonClick={() => navigate('/EditProfile')}
        />
        <MypageMenuList />
        <MyCalendar />
        <LogoutBtn />
      </div>

      {/* Footer 부분을 sticky로 설정 */}
      <div className="sticky bottom-0 z-10 bg-white py-[20px]">
        <Footer />
      </div>
    </div>
  );
}
