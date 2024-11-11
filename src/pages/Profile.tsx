import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import ProfileInput from '../common/ProfileInput';
import Button from '../components/Profile/Button';
import { userState } from '../recoil/userAtoms';
import { useState } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import OauthImg from '../common/OauthImg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SIGNUP_URL = '/user/signup';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [description, setDescription] = useState(user.description || '');
  const isNicknameEmpty = nickname.trim() === '';

  const handleSignup = async () => {
    try {
      // 회원가입 요청
      const response = await apiClient.post(
        SIGNUP_URL,
        {
          oauthUserToken: user.oauthUserToken,
          nickname,
          description: description || '',
          profileImage: user.profileImage, // OAuth 기본 프로필 사진 사용
          univName: user.univName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const authHeader = response.headers['authorization'];
      const refreshHeader = response.headers['refresh-token'];
      const data = response.data;

      localStorage.setItem('nickname', data.nickname);

      if (authHeader) Cookies.set('Authorization', authHeader, { path: '/' });
      if (refreshHeader) Cookies.set('Refresh-Token', refreshHeader, { path: '/' });

      setUser(prev => ({
        ...prev,
        token: data.token,
        nickname: data.nickname,
        description: data.description,
        profileImage: data.profileImage,
        univName: data.univName,
      }));

      toast.success('회원가입이 완료되었습니다.');
      navigate('/home');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      toast.error('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header title="" />
      <div className="px-[36px] flex-grow">
        <OauthImg profileImage={user.profileImage} />
        <ProfileInput
          nickname={nickname}
          description={description}
          onNicknameChange={setNickname}
          onDescriptionChange={setDescription}
        />
      </div>
      <div className="absolute bottom-[48px] left-0 right-0 px-[30px]">
        <Button label="회원가입" onClick={handleSignup} disabled={isNicknameEmpty} />
      </div>
    </div>
  );
}
