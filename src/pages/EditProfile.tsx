import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';
import EditButton from '../components/EditProfile/EditButton';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';

export default function EditProfile() {
  return (
    <div className="h-full w-full flex flex-col">
      <Header title="프로필 수정" navigateTo="/Mypage" />
      <div className="px-[36px] flex-grow">
        <ProfileImg />
        <ProfileInput />
        <EditButton />
        <WithdrawBtn />
      </div>
    </div>
  );
}
