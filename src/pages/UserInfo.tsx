import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
import { blockedUserState } from '../recoil/blockedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import Cookies from 'js-cookie';

interface UserInfoType {
  token: string;
  nickname: string;
  description: string;
  univName: string;
  profileImage: string;
  isBlocked: boolean;
}

export default function UserInfo() {
  const userToken = useRecoilValue(selectedUserState);
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUserState);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/user/${userToken}`, {
          headers: { Authorization: Cookies.get('Authorization') },
        });
        const fetchedUserInfo = response.data;
        const isUserBlocked = blockedUsers.some(user => user.token === fetchedUserInfo.token);
        setUserInfo({ ...fetchedUserInfo, isBlocked: isUserBlocked });
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    if (userToken) fetchUserInfo();
  }, [userToken, blockedUsers]);

  const handleBlockToggle = async () => {
    if (userInfo) {
      const updatedBlockedStatus = !userInfo.isBlocked;
      try {
        if (updatedBlockedStatus) {
          await apiClient.post(
            `/user/block/${userInfo.token}`,
            {},
            {
              headers: { Authorization: Cookies.get('Authorization') },
            },
          );
          setUserInfo({ ...userInfo, isBlocked: true });
          setBlockedUsers(prev => [...prev, { ...userInfo, isBlocked: true }]);
        } else {
          await apiClient.delete(`/user/block/${userInfo.token}`, {
            headers: { Authorization: Cookies.get('Authorization') },
          });
          setUserInfo({ ...userInfo, isBlocked: false });
          setBlockedUsers(prev => prev.filter(user => user.token !== userInfo.token));
        }
      } catch (error) {
        console.error('차단/차단 해제 실패:', error);
      }
    }
  };

  if (!userInfo) return <div>유저 정보를 불러오는 중입니다...</div>;

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="유저 정보" navigateTo="/mypage" />
      <div className="px-[36px]">
        <User
          name={userInfo.nickname}
          university={userInfo.univName}
          bio={userInfo.description}
          profileImage={userInfo.profileImage}
          buttonLabel={userInfo.isBlocked ? '차단 해제' : '차단 하기'}
          buttonWidth="84px"
          onButtonClick={handleBlockToggle}
        />
      </div>
    </div>
  );
}
