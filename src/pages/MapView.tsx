import { useState } from 'react';
import Content from '../components/MapView/Content';
import Header from '../components/MapView/Header';
import MeetModal from '../components/MapView/MeetModal';

export interface List {
  id: number;
  title: string;
  maxMember: number;
  currentMember: number;
  eupMyeonDong: string;
  gatheringDateTime: string;
  views: number;
  latitude: number;
  longitude: number;
  author: {
    token: string;
    nickname: string;
    profileImage: string;
    univName: string;
  };
  thumbnail: string | null;
}

export default function MapView() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<List | null>(null);
  console.log(modalContent);
  return (
    <div className="flex flex-col w-full h-full py-1 relative">
      <div className="w-full">
        <Header />
      </div>

      <Content
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
        setModalContent={setModalContent}
      />
      {modalContent && <MeetModal modalContent={modalContent} />}
    </div>
  );
}
