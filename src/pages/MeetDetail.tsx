import { useState } from 'react';
import Content from '../components/MeetDetail/Content';
import Footer from '../components/MeetDetail/Footer';
import Header from '../components/MeetDetail/Header';
import '../style.css';
import UserMore from '../common/UserMore';
import Update from '../components/MeetDetail/Update.tsx/Update';
import RemoveMeet from '../components/MeetDetail/RemoveMeet';
import OutMeet from '../components/MeetDetail/OutMeet';
import More from '../components/MeetDetail/More';
export interface Response {
  id: number;
  title: string;
  content: string;
  maxMember: number;
  currentMember: number;
  address?: string;
  latitude?: number;
  longitude?: number;
  gatheringDateTime: string;
  userNickname: string;
  createdAt: string;
  likes: number;
  views: number;
  owner: boolean;
}

export default function MeetDetail() {
  const [gatheringData, setGatheringData] = useState<Response | null>(null);
  const [Modal, setModal] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const [outMeet, setOutMeet] = useState(false);
  const fullMember = gatheringData?.currentMember === gatheringData?.maxMember;
  const owner = gatheringData?.owner;

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal &&
        (gatheringData?.owner ? (
          <UserMore setModal={setModal} setModify={setModify} setRemove={setRemove} />
        ) : (
          <More setModal={setModal} setOutMeet={setOutMeet} />
        ))}
      {modify && <Update updateData={gatheringData} setModify={setModify} />}
      {remove && <RemoveMeet setRemove={setRemove} />}
      {outMeet && <OutMeet setOutMeet={setOutMeet} />}
      <div className="w-[85%]">
        <Header setModal={setModal} title={gatheringData?.title} />
      </div>

      <div className="overflow-y-auto hidden-scrollbar w-[85%]">
        <Content gatheringData={gatheringData} setGatheringData={setGatheringData} modify={modify} outMeet={outMeet} />
      </div>

      <div className="w-[90%]">
        <Footer fullMember={fullMember} owner={owner} />
      </div>
    </div>
  );
}
