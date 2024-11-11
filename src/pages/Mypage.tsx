import LogoutBtn from '../components/Mypage/LogoutBtn';
import MyCalendar from '../components/Mypage/MyCalendar';
import MypageMenuList from '../components/Mypage/MypageMenuList';
import Title from '../components/Mypage/Title';
import 'react-calendar/dist/Calendar.css';

import User from '../common/User';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/userAtoms';
import { useEffect } from 'react';
import apiClient from '../api/apiClient';
import SideBar from '../common/SideBar';
import Cookies from 'js-cookie';

export default function Mypage() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/user/my', {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        });

        const userData = response.data;
        setUser(prevUser => ({
          ...prevUser,
          nickname: userData.nickname,
          univName: userData.univName,
          description: userData.description,
          profileImage: userData.profileImage,
        }));
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    if (!user.nickname) {
      // 유저 정보가 없을 때만 API 호출
      fetchUserData();
    }
  }, [user, setUser]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white">
        <Title />
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto px-[33px] hidden-scrollbar flex-1">
        <User
          name={user.nickname}
          university={user.univName}
          bio={user.description}
          profileImage={user.profileImage}
          buttonLabel="내 정보 수정"
          buttonWidth="100px"
          onButtonClick={() => navigate('/editprofile')}
        />
        <MypageMenuList />
        <MyCalendar />
        <LogoutBtn />
      </div>
      <footer className="h-20 w-full flex justify-center">
        <div className="w-[90%]">
          <SideBar />
        </div>
      </footer>
    </div>
  );
}
