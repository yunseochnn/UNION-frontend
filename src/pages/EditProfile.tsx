import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';
import EditButton from '../components/EditProfile/EditButton';
import ProfileInput from '../common/ProfileInput';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { userState } from '../recoil/userAtoms';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';

export default function EditProfile() {
  const [user, setUser] = useRecoilState(userState);
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage);
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(user.description);

  useEffect(() => {
    setProfileImage(user.profileImage);
    setNickname(user.nickname);
    setDescription(user.description);
  }, [user]);

  // 파일 선택 시 이미지 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const formData = new FormData();
      formData.append('images', selectedFile);

      try {
        const uploadResponse = await apiClient.post('/photo/upload', formData, {
          headers: {
            Authorization: Cookies.get('Authorization') || '',
            'Content-Type': 'multipart/form-data',
          },
        });
        const uploadedUrl = uploadResponse.data[0];
        setProfileImage(uploadedUrl); // 서버에서 받은 URL로 상태 업데이트
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    if (profileImage === user.profileImage && nickname === user.nickname && description === user.description) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      const updatedProfileData: Record<string, any> = {};
      if (nickname !== user.nickname) updatedProfileData.nickname = nickname;
      if (description !== user.description) updatedProfileData.description = description || '';
      if (profileImage && profileImage !== user.profileImage) updatedProfileData.profileImage = profileImage;

      const { data: updatedUser } = await apiClient.put('/user/my', updatedProfileData, {
        headers: {
          Authorization: Cookies.get('Authorization') || '',
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
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />}
        </div>
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
