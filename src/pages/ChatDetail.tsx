import { useEffect, useRef, useState } from 'react';
import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';
import More from '../components/ChatDetail/More';
import { Client } from '@stomp/stompjs';

const socketUrl = `${import.meta.env.VITE_API_BASE_URL.replace('https', 'ws')}/ws`;

export default function ChatDetail() {
  const [modal, setModal] = useState(false);
  const client = useRef<Client | null>(null);

  //소켓 연결
  useEffect(() => {
    client.current = new Client({
      brokerURL: socketUrl,

      reconnectDelay: 5000,
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, []);
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
