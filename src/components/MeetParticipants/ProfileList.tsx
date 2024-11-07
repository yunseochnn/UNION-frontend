import { useParams, useSearchParams } from 'react-router-dom';
import { IFMember } from './Content';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';

interface Prop {
  member: IFMember;
  MeetMember: () => void;
}

const ProfileList = ({ member, MeetMember }: Prop) => {
  const myNickname = localStorage.getItem('nickname');
  const [searchParams] = useSearchParams();
  const ownerNic = searchParams.get('ownerNic');
  const owner = myNickname === ownerNic;
  const { id } = useParams();
  const MeetId = Number(id);

  const onClickOutMember = async () => {
    try {
      await apiClient.post(
        `/gatherings/${MeetId}/${member.token}/kick-out`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      );

      console.log('강퇴 완료');
      MeetMember();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-16 w-full flex justify-between items-center mt-2">
      <div className="flex items-center">
        <div className="h-14 w-14 rounded-full bg-gray-300 overflow-hidden">
          <img src={member.profileImage} />
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <div className="font-bold text-base">{member.nickname}</div>
            <div className="font-semibold text-xs text-gray-400">{member.univName}</div>
          </div>
          <div className="font-semibold text-sm text-gray-400">{member.description}</div>
        </div>
      </div>
      {owner && member.nickname !== myNickname && (
        <div
          className="w-[22%] h-7 rounded-full text-white flex items-center justify-center font-semibold text-sm cursor-pointer"
          style={{ backgroundColor: '#ff4a4d' }}
          onClick={onClickOutMember}
        >
          강퇴하기
        </div>
      )}
    </div>
  );
};

export default ProfileList;
