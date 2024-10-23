import { useState } from 'react';
import Content from '../components/MeetDetail/Content';
import Footer from '../components/MeetDetail/Footer';
import Header from '../components/MeetDetail/Header';
import More from '../components/MeetDetail/More';
import '../style.css';

export default function MeetDetail() {
  const [Modal, setModal] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal && <More setModal={setModal} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <div className=" overflow-y-auto hidden-scrollbar w-[85%]">
        <Content />
      </div>

      <div className="w-[90%]">
        <Footer />
      </div>
    </div>
  );
}
