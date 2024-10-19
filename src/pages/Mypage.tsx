import LogoutBtn from '../components/Mypage/LogoutBtn';
import MyCalendar from '../components/Mypage/MyCalendar';
import MypageMenuList from '../components/Mypage/MypageMenuList';
import Title from '../components/Mypage/Title';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Profile/Footer';
import User from '../common/User';

export default function Mypage() {
  return (
    <div className="h-full w-full flex flex-col">
      <Title />
      <div className="flex flex-col flex-grow px-[36px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel="내 정보 수정"
          buttonWidth="100px"
          onButtonClick={() => console.log('내 정보 수정 클릭됨')}
        />
        <MypageMenuList />
        <MyCalendar />
        <LogoutBtn />
        <div className="py-[20px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
