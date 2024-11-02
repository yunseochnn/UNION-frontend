import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import Button from '../components/Profile/Button';
import { userState } from '../recoil/userAtoms';
import { useState } from 'react';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const SIGNUP_URL = '/user/signup';
const UPLOAD_URL = '/photo/upload';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [description, setDescription] = useState(user.description || '');
  const isNicknameEmpty = nickname.trim() === '';

  const handleImageChange = (newImage: string) => {
    setUser(prev => ({ ...prev, profileImage: newImage }));
  };

  // 이미지 업로드 함수
  const uploadImage = async (image: string) => {
    try {
      const formData = new FormData();
      formData.append('images', image);

      const response = await apiClient.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
        },
      });

      return response.data[0];
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다른 이미지를 선택해 주세요.');
      throw error;
    }
  };

  const handleSignup = async () => {
    try {
      let profileImageUrl = user.profileImage;

      // 프로필 이미지가 새로 변경된 경우 업로드
      if (user.profileImage) {
        profileImageUrl = await uploadImage(user.profileImage);
      }

      // 회원가입 요청
      const response = await apiClient.post(
        SIGNUP_URL,
        {
          oauthUserToken: user.oauthUserToken,
          nickname,
          description: description || '',
          profileImage: profileImageUrl,
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

      console.log('회원가입 성공:', data);
      navigate('/home');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="" navigateTo="/emailverification" />
      <div className="px-[36px] flex-grow">
        <ProfileImg profileImage={user.profileImage} onImageChange={handleImageChange} />
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
