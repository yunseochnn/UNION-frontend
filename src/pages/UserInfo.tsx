import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedUserState } from '../recoil/selectedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import UserTabs from '../components/UserInfo/UserTabs';
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
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(`/user/${userToken}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('Authorization')}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    };

    if (userToken) {
      fetchUserInfo();
    }
  }, [userToken]);

  const handleBlockToggle = async () => {
    if (userInfo) {
      const updatedBlockedStatus = !userInfo.isBlocked;
      try {
        if (updatedBlockedStatus) {
          await apiClient.post(
            `/user/block/${userInfo.token}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('Authorization')}`,
              },
            },
          );
        } else {
          await apiClient.delete(`/user/block/${userInfo.token}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('Authorization')}`,
            },
          });
        }
        setUserInfo(prev => (prev ? { ...prev, isBlocked: updatedBlockedStatus } : null));
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
      <UserTabs />
    </div>
  );
}
