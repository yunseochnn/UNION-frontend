import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';
import EditButton from '../components/EditProfile/EditButton';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { userState } from '../recoil/userAtoms';
import apiClient from '../api/apiClient';

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
    try {
      let profileImageUrl = profileImage;
      if (profileImage && profileImage !== user.profileImage) {
        const formData = new FormData();
        formData.append('file', profileImage);

        const uploadResponse = await apiClient.post('/photo/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        profileImageUrl = uploadResponse.data[0];
      }

      // S3에 업로드된 이미지 URL을 특정 타겟에 저장
      const targetId = 123; // 실제 targetId로 대체
      const targetType = 'GATHERING'; // 실제 targetType으로 대체

      await apiClient.post('/photo/save', {
        targetId,
        targetType,
        urls: [profileImageUrl],
      });

      // 프로필 정보 업데이트 요청
      const { data: updatedUser } = await apiClient.post('/user/update-profile', {
        nickname,
        description,
        profileImage: profileImageUrl,
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
      <Header title="프로필 수정" navigateTo="/Mypage" />
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
