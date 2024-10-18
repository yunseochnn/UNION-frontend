import ProfileImg from '../components/EditProfile/ProfileImg';
import EditProfileInput from '../components/EditProfile/EditProfileInput';
import WithdrawBtn from '../components/EditProfile/WithdrawBtn';

export default function EditProfile() {
  return (
    <div className="flex flex-col px-[31px]">
      <div className="flex justify-center">
        <ProfileImg />
      </div>
      <EditProfileInput />
      <WithdrawBtn />
    </div>
  );
}
