import { useCallback, useEffect, useRef, useState } from 'react';
import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';
import More from '../components/ChatDetail/More';
import { Client } from '@stomp/stompjs';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userAtoms';

const socketUrl = `${import.meta.env.VITE_API_BASE_URL.replace('https', 'wss')}/ws`;

export interface IFChatInfo {
  senderName: string;
  senderToken: string;
  senderProfileImage: string | null;
  content: string;
  createdAt: string;
}

export default function ChatDetail() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const title = searchParams.get('title');
  console.log(uid);
  const user = useRecoilValue(userState);
  const myNickname = user.nickname;
  console.log(myNickname);

  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<IFChatInfo[]>([]);
  const client = useRef<Client | null>(null);
  const [input, setInput] = useState('');

  const privateChatHistory = useCallback(async () => {
    try {
      const response = await apiClient.get(`/chat/private/${uid}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      if (response.data) {
        console.log(response);
        const ChatInfos = response.data;
        const formattedMessages = ChatInfos.map((message: IFChatInfo) => ({
          content: message.content,
          senderName: message.senderName,
          senderToken: message.senderToken,
          senderProfileImage: message.senderProfileImage,
          createdAt: message.createdAt,
        }));
        console.log(formattedMessages);
        setMessages(formattedMessages);
      }
    } catch {
      // 오류 무시
    }
  }, [uid]);

  useEffect(() => {
    privateChatHistory();
  }, [privateChatHistory]);

  //소켓 연결
  useEffect(() => {
    client.current = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 50000,
      onConnect: () => {
        //개인 메시지 구독
        client.current?.subscribe(`/topic/private/${uid}`, message => {
          const chatResponse = JSON.parse(message.body);
          console.log(message.body);
          setMessages(prevMessages => [...prevMessages, chatResponse]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });

    //websocket 연결 활성화
    client.current.activate();

    //컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, [uid]);

  const sendMessage = () => {
    if (client.current?.connected && input.trim()) {
      const privateChatRequest = {
        receiverToken: uid,
        content: input,
        senderNickname: myNickname,
      };

      client.current.publish({
        destination: '/app/private',
        body: JSON.stringify(privateChatRequest),
      });

      // 메시지 상태에 새로운 메시지 추가
      setMessages(prevMessages => [
        ...prevMessages,
        {
          content: input,
          senderName: myNickname,
          senderToken: 'me', // 내 토큰(임시)
          senderProfileImage: null,
          createdAt: new Date().toISOString(),
        },
      ]);

      setInput('');
    }
  };

  return (
    <div className="flex flex-col w-full h-full pb-2 pt-1 relative items-center">
      {modal && <More setModal={setModal} />}
      <div className="w-[85%]">
        <Header setModal={setModal} title={title} />
      </div>

      <Content messages={messages} />
      <Footer input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
