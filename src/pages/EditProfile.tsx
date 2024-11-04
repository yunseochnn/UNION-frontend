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
  const [profileImage, setProfileImage] = useState<Blob | string | null>(null); // Blob 형식도 추가
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(user.description);

  useEffect(() => {
    setProfileImage(user.profileImage);
    setNickname(user.nickname);
    setDescription(user.description);
  }, [user]);

  // 크롭된 이미지 Blob을 받아와 상태로 저장하는 함수
  const handleImageChange = async (croppedImage: Blob) => {
    setProfileImage(croppedImage);
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    try {
      let profileImageUrl = user.profileImage;

      // profileImage가 Blob일 경우 File로 변환하여 업로드
      if (profileImage instanceof Blob) {
        const file = new File([profileImage], 'profile.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('images', file);

        const uploadResponse = await apiClient.post('/photo/upload', formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('Authorization')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        profileImageUrl = uploadResponse.data[0];
      }

      const updatedProfileData: Record<string, any> = {};
      if (nickname !== user.nickname) updatedProfileData.nickname = nickname;
      if (description !== user.description) updatedProfileData.description = description || '';
      if (profileImageUrl && profileImageUrl !== user.profileImage) updatedProfileData.profileImage = profileImageUrl;

      const { data: updatedUser } = await apiClient.put('/user/my', updatedProfileData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
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
      if (error instanceof Error) {
        console.error('프로필 업데이트 중 오류 발생:', error.message);
      } else {
        console.error('알 수 없는 오류 발생:', error);
      }
      alert('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Header title="프로필 수정" navigateTo="/mypage" />
      <div className="px-[36px] flex-grow">
        <ProfileImg profileImage={user.profileImage} onImageChange={handleImageChange} />
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
