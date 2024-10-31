import { useState } from 'react';
import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';
import More from '../components/ChatDetail/More';

export default function ChatDetail() {
  const [modal, setModal] = useState(false);
  return (
    <div className="flex flex-col w-full h-full pb-2 pt-1 relative items-center">
      {modal && <More setModal={setModal} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <Content />
      <Footer />
    </div>
  );
}
