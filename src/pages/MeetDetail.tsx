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
import UserBlock from '../common/UserBlock';
export interface Response {
  id: number;
  title: string;
  content: string;
  maxMember: number;
  currentMember: number;
  address?: string;
  latitude?: number;
  longitude?: number;
  eupMyeonDong: string;
  gatheringDateTime: string;
  createdAt: string;
  likes: number;
  views: number;
  author: {
    token: string;
    nickname: string;
    profileImage: string;
    univName: string;
  };
  recruited: boolean; // 모집 완료 여부
  photos: string[]; // 사진 정보
  owner: boolean; // 주최자
  liked: boolean; // 좋아요 여부
  joined: boolean; // 가입 여부
}

export default function MeetDetail() {
  const [gatheringData, setGatheringData] = useState<Response | null>(null);
  const [Modal, setModal] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const [outMeet, setOutMeet] = useState(false);
  const [userBlock, setUserBlock] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal &&
        (gatheringData?.owner ? (
          <UserMore setModal={setModal} setModify={setModify} setRemove={setRemove} />
        ) : (
          <More setModal={setModal} setOutMeet={setOutMeet} setUserBlock={setUserBlock} />
        ))}
      {modify && <Update updateData={gatheringData} setModify={setModify} />}
      {remove && <RemoveMeet setRemove={setRemove} />}
      {outMeet && <OutMeet setOutMeet={setOutMeet} />}
      {userBlock && <UserBlock setUserBlock={setUserBlock} token={gatheringData?.author.token || ''} />}
      <div className="w-[85%]">
        <Header
          setModal={setModal}
          title={gatheringData?.title}
          token={gatheringData?.author.token || ''}
          authorNickname={gatheringData?.author.nickname || ''}
        />
      </div>

      <div className="overflow-y-auto hidden-scrollbar w-[85%] flex-1">
        <Content gatheringData={gatheringData} setGatheringData={setGatheringData} modify={modify} outMeet={outMeet} />
      </div>

      <div className="w-[90%]">
        <Footer gatheringData={gatheringData} />
      </div>
    </div>
  );
}
