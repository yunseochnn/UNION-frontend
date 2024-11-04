import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';
import EditButton from '../components/EditProfile/EditButton';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import { useRecoilState } from 'recoil';
import { useEffect, useState, useCallback } from 'react';
import { userState } from '../recoil/userAtoms';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';

export default function EditProfile() {
  const [user, setUser] = useRecoilState(userState);
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage);
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(user.description);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

  // 유저 정보
  const fetchUserInfo = useCallback(async () => {
    try {
      const { data } = await apiClient.get('/user/my', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      setUser(data);
      setProfileImage(data.profileImage);
      setNickname(data.nickname);
      setDescription(data.description);
    } catch (error) {
      console.error('유저 정보 불러오기 오류:', error);
      alert('유저 정보를 불러오는 데 실패했습니다.');
    }
  }, [setUser]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    try {
      let profileImageUrl = user.profileImage;

      if (croppedImage) {
        const jpegFile = new File([croppedImage], 'cropped-profile.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('images', jpegFile);

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
      if (profileImageUrl && profileImageUrl !== user.profileImage) updatedProfileData.profileImage = profileImageUrl;

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

      localStorage.setItem('nickname', updatedUser.nickname);

      setProfileImage(profileImageUrl);
      setCroppedImage(null);
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
        <ProfileImg profileImage={profileImage || ''} onImageChange={setCroppedImage} />
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
