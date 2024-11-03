import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';
import EditButton from '../components/EditProfile/EditButton';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { userState } from '../recoil/userAtoms';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';

export default function EditProfile() {
  const [user, setUser] = useRecoilState(userState);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(user.description);

  useEffect(() => {
    setProfileImage(user.profileImage);
    setNickname(user.nickname);
    setDescription(user.description);
  }, [user]);

  const handleSave = async () => {
    // 변경사항이 없으면 함수 종료
    if (profileImage === user.profileImage && nickname === user.nickname && description === user.description) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      let profileImageUrl = profileImage;

      if (profileImage && profileImage !== user.profileImage) {
        const formData = new FormData();
        formData.append('file', profileImage);

        const uploadResponse = await apiClient.post('/photo/upload', formData, {
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'multipart/form-data',
          },
        });
        profileImageUrl = uploadResponse.data[0];
      }

      const updatedProfileData: Record<string, any> = {};
      if (nickname !== user.nickname) updatedProfileData.nickname = nickname;
      if (description !== user.description) updatedProfileData.description = description || '';
      if (profileImageUrl !== user.profileImage) updatedProfileData.profileImage = profileImageUrl;

      const { data: updatedUser } = await apiClient.put('/user/my', updatedProfileData, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      setUser(prev => ({
        ...prev,
        nickname: updatedUser.nickname,
        description: updatedUser.description,
        profileImage: updatedUser.profileImage,
      }));

      alert('프로필이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Header title="프로필 수정" navigateTo="/mypage" />
      <div className="px-[36px] flex-grow">
        <ProfileImg profileImage={profileImage} onImageChange={setProfileImage} />
        <ProfileInput
          nickname={nickname}
          description={description}
          onNicknameChange={setNickname}
          onDescriptionChange={setDescription}
        />
        <EditButton label="저장" onClick={handleSave} />
        <WithdrawBtn />
      </div>
    </div>
  );
}
