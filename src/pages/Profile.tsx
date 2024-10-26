import { useRecoilState } from 'recoil';
import Header from '../common/Header';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import Button from '../components/Profile/Button';
import { userState } from '../recoil/userAtoms';
import { useState } from 'react';
import Cookies from 'js-cookie';

const SIGNUP_URL = '/user/signup';

export default function Profile() {
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname || '');
  const [description, setDescription] = useState(user.description || '');

  const handleImageChange = (newImage: string) => {
    setUser(prev => ({ ...prev, profileImage: newImage }));
  };

  const handleSignup = () => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oauthUserToken: user.oauthUserToken,
        nickname,
        description: description || '',
        profileImage: user.profileImage,
        univName: user.univName,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error(`회원가입 요청 실패 - ${response.status}`);
        const authHeader = response.headers.get('Authorization');
        const refreshHeader = response.headers.get('Refresh-Token');

        return response.json().then(data => ({
          data,
          authHeader,
          refreshHeader,
        }));
      })
      .then(({ data, authHeader, refreshHeader }) => {
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
      })
      .catch(error => {
        console.error('회원가입 중 오류 발생:', error);
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      });
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
        <Button label="회원가입" onClick={handleSignup} />
      </div>
    </div>
  );
}
