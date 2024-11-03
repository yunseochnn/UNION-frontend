import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { selectedUserState } from '../recoil/selectedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface BlockedUser {
  token: string;
  nickname: string;
  description: string;
  univName: string;
  profileImage: string;
  isBlocked: boolean;
}

export default function BlockedUserList() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const navigate = useNavigate();

  // 차단 유저 목록 불러오기
  const fetchBlockedUsers = async () => {
    try {
      const response = await apiClient.get<BlockedUser[]>('/user/block', {
        headers: { Authorization: Cookies.get('Authorization') },
      });
      setBlockedUsers(response.data);
    } catch (error) {
      console.error('차단 유저 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const handleUserClick = async (userToken: string) => {
    try {
      const response = await apiClient.get(`/user/${userToken}`, {
        headers: { Authorization: Cookies.get('Authorization') },
      });
      setSelectedUser(response.data.token);
      navigate('/userinfo');
    } catch (error) {
      console.error('유저 상세 정보 불러오기 실패:', error);
    }
  };

  const handleBlockToggle = async (userToken: string) => {
    const userToToggle = blockedUsers.find(user => user.token === userToken);
    if (!userToToggle) return;

    try {
      if (userToToggle.isBlocked) {
        // 차단 해제 요청
        await apiClient.delete(`/user/block/${userToken}`, {
          headers: { Authorization: Cookies.get('Authorization') },
        });
        // 차단 해제된 유저를 목록에서 제거
        setBlockedUsers(prev => prev.filter(user => user.token !== userToken));
      }
    } catch (error) {
      console.error('차단 해제 실패:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header title="차단 유저 목록" navigateTo="/Mypage" />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar py-3 px-[30px]">
        {blockedUsers.map(user => (
          <User
            key={user.token}
            token={user.token}
            name={user.nickname}
            university={user.univName}
            bio={user.description}
            profileImage={user.profileImage}
            buttonLabel="차단 해제" // 차단 해제 버튼으로 고정
            buttonWidth="84px"
            isBlocked={user.isBlocked}
            onClick={() => handleUserClick(user.token)}
            onButtonClick={() => handleBlockToggle(user.token)}
          />
        ))}
      </div>
    </div>
  );
}
