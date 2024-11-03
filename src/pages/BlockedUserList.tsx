import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { blockedUserState, BlockedUser } from '../recoil/blockedUserState';
import { selectedUserState } from '../recoil/selectedUserState';
import apiClient from '../api/apiClient';
import Header from '../common/Header';
import User from '../common/User';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function BlockedUserList() {
  const [blockedUsers, setBlockedUsers] = useRecoilState(blockedUserState);
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await apiClient.get<BlockedUser[]>('/user/block', {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        });
        setBlockedUsers(response.data);
      } catch (error) {
        console.error('차단 유저 목록 불러오기 실패:', error);
      }
    };

    fetchBlockedUsers();
  }, [setBlockedUsers]);

  const handleUserClick = async (userToken: string) => {
    try {
      const response = await apiClient.get(`/user/${userToken}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      const userDetails = response.data;
      setSelectedUser(userDetails.token);
      navigate('/userinfo');
    } catch (error) {
      console.error('유저 상세 정보 불러오기 실패:', error);
    }
  };

  const handleBlockToggle = async (userToken: string) => {
    try {
      const userToToggle = blockedUsers.find(user => user.token === userToken);
      if (!userToToggle) return;

      const isCurrentlyBlocked = userToToggle.isBlocked;

      if (isCurrentlyBlocked) {
        await apiClient.delete(`/user/block/${userToken}`, {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        });
      } else {
        await apiClient.post(
          `/user/block/${userToken}`,
          {},
          {
            headers: {
              Authorization: Cookies.get('Authorization'),
            },
          },
        );
      }

      setBlockedUsers(prev =>
        prev.map(user => (user.token === userToken ? { ...user, isBlocked: !isCurrentlyBlocked } : user)),
      );
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
            onClick={() => handleUserClick(user.token)}
            onButtonClick={() => handleBlockToggle(user.token)}
          />
        ))}
      </div>
    </div>
  );
}
