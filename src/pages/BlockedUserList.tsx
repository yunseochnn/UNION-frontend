import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { blockedUserState, BlockedUser } from '../recoil/blockedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';

export default function BlockedUserList() {
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUserState);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await apiClient.get<BlockedUser[]>('/user/block');
        setBlockedUsers(response.data);
      } catch (error) {
        console.error('차단 유저 목록 불러오기 실패:', error);
      }
    };

    fetchBlockedUsers();
  }, [setBlockedUsers]);

  const handleBlockToggle = async (userToken: string) => {
    try {
      const isBlocked = blockedUsers.find(user => user.token === userToken)?.isBlocked;

      if (isBlocked) {
        // 차단 해제 요청
        await apiClient.delete(`/user/block/${userToken}`);
        setBlockedUsers(prev => prev.map(user => (user.token === userToken ? { ...user, isBlocked: false } : user)));
      } else {
        // 차단 요청
        await apiClient.post(`/user/block/${userToken}`);
        setBlockedUsers(prev => prev.map(user => (user.token === userToken ? { ...user, isBlocked: true } : user)));
      }
    } catch (error) {
      console.error('차단/차단 해제 실패:', error);
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
            buttonLabel={user.isBlocked ? '차단 해제' : '차단 하기'}
            buttonWidth="84px"
            isBlocked={user.isBlocked}
            onButtonClick={() => handleBlockToggle(user.token)} // user token 전달
          />
        ))}
      </div>
    </div>
  );
}
