import ProfileImg from '../components/EditProfile/ProfileImg';
import EditProfileInput from '../components/EditProfile/EditProfileInput';
import WithdrawBtn from '../components/EditProfile/WithdrawBtn';
import Header from '../common/Header';

export default function EditProfile() {
  return (
    <div className="h-full w-full flex flex-col">
      <Header title="마이페이지" />
      <div className="px-[31px]">
        <div className="flex justify-center">
          <ProfileImg />
        </div>
        <EditProfileInput />
        <WithdrawBtn />
      </div>
    </div>
  );
}
