import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import ProfileList from './ProfileList';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';

export interface IFMember {
  email: string;
  token: string;
  nickname: string;
  description: string;
  profileImage: string;
  univName: string;
  gatheringId: number;
  partyRole: string;
}

const Content = () => {
  const { id } = useParams();
  const MeetId = Number(id);
  const [Members, setMembers] = useState<IFMember[]>([]);

  const MeetMember = useCallback(async () => {
    try {
      const response = await apiClient.get(`/parties/${MeetId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [MeetId]);

  useEffect(() => {
    MeetMember();
  }, [MeetMember]);
  return (
    <div className="mt-2 flex flex-col px-[33px] w-full">
      {Members.map((member, index) => (
        <div key={index}>
          <ProfileList member={member} />
        </div>
      ))}
    </div>
  );
};

export default Content;
