import LogoutBtn from '../components/Mypage/LogoutBtn';
import MyCalendar from '../components/Mypage/MyCalendar';
import MypageMenuList from '../components/Mypage/MypageMenuList';
import Title from '../components/Mypage/Title';
import 'react-calendar/dist/Calendar.css';
export default function Mypage() {
  return (
    <div className="px-[36px]">
      <Title />
      <MypageMenuList />
      <MyCalendar />
      <LogoutBtn />
    </div>
  );
}
