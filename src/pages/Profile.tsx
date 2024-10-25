import Header from '../common/Header';
import ProfileImg from '../common/ProfileImg';
import ProfileInput from '../common/ProfileInput';
import Button from '../components/Profile/Button';

import Title from '../components/Profile/Title';

export default function Profile() {
  return (
    <div className="h-full w-full flex flex-col relative">
      <Header title="" navigateTo="/emailverification" />
      <div className="px-[36px] flex-grow">
        <Title />
        <ProfileImg />
        <ProfileInput />
      </div>
      <div className="absolute bottom-[48px] left-0 right-0 px-[30px]">
        <Button />
      </div>
    </div>
  );
}
