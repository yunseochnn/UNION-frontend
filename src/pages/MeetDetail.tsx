import { useState } from 'react';
import Content from '../components/MeetDetail/Content';
import Footer from '../components/MeetDetail/Footer';
import Header from '../components/MeetDetail/Header';
import More from '../components/MeetDetail/More';

export default function MeetDetail() {
  const [Modal, setModal] = useState(false);

  return (
    <div className="h-full w-full flex flex-col px-[30px] py-3 relative">
      {Modal && <More setModal={setModal} />}
      <Header setModal={setModal} />
      <Content />
      <Footer />
    </div>
  );
}
