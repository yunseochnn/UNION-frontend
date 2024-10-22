import { useState } from 'react';
import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';
import More from '../components/ChatDetail/More';

export default function ChatDetail() {
  const [modal, setModal] = useState(false);
  return (
    <div className="flex flex-col w-full h-full px-[30px] py-3 relative">
      {modal && <More setModal={setModal} />}
      <Header setModal={setModal} />
      <Content />
      <Footer />
    </div>
  );
}
