import { useState } from 'react';
import Content from '../components/MeetDetail/Content';
import Footer from '../components/MeetDetail/Footer';
import Header from '../components/MeetDetail/Header';
// import More from '../components/MeetDetail/More';
import '../style.css';
import UserMore from '../common/UserMore';
import Update from '../components/MeetDetail/Update.tsx/Update';
import RemoveBoard from '../components/MeetDetail/RemoveBoard';

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
}

export default function MeetDetail() {
  const [gatheringData, setGatheringData] = useState<Response | null>(null);
  const [Modal, setModal] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);

  const updateData = {
    title: '제목',
    content: '내용',
  };

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal && <UserMore setModal={setModal} setModify={setModify} setRemove={setRemove} />}
      {modify && <Update updateData={updateData} setModify={setModify} />}
      {remove && <RemoveBoard setRemove={setRemove} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <div className=" overflow-y-auto hidden-scrollbar w-[85%]">
        <Content gatheringData={gatheringData} setGatheringData={setGatheringData} />
      </div>

      <div className="w-[90%]">
        <Footer />
      </div>
    </div>
  );
}
