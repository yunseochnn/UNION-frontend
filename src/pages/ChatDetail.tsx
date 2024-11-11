import { useCallback, useEffect, useRef, useState } from 'react';
import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';
import More from '../components/ChatDetail/More';
import { Client } from '@stomp/stompjs';
import { useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';
import UserBlock from '../common/UserBlock';
import MeetMore from '../components/ChatDetail/MeetMore';
import OutMeet from '../components/MeetDetail/OutMeet';
import OutChatModal from '../components/ChatDetail/OutChatModal';

const socketUrl = `${import.meta.env.VITE_API_BASE_URL.replace('https', 'wss')}/ws`;

export interface IFMessageInfo {
  senderName: string;
  senderToken: string;
  senderProfileImage: string;
  content: string;
  createdAt: string;
}
export interface IFChatInfo {
  title: string;
  chatroomId: number;
  chatroomType: string;
  messageInfoList: IFMessageInfo[];
}

export default function ChatDetail() {
  const { option } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  const uid = localStorage.getItem('userToken');
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<IFMessageInfo[]>([]);
  const client = useRef<Client | null>(null);
  const [input, setInput] = useState('');
  const name = localStorage.getItem('nickname') || '';
  const [myNickname, setMyNickname] = useState(name);
  const [userBlock, setUserBlock] = useState(false);
  const roomId = searchParams.get('chatId');
  const [chatroomId, setChatroomId] = useState(Number(roomId) || -1);
  const userToken = localStorage.getItem('userToken');
  const [outMeet, setOutMeet] = useState(false);
  const [outChat, setOutChat] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/my', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      const data = response.data;
      localStorage.setItem('nickname', data.nickname);
      setMyNickname(data.nickname);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (myNickname === '') {
      getUserInfo();
    }
  }, [myNickname]);

  const privateChatHistory = useCallback(async () => {
    try {
      const response = await apiClient.get(`/chat/${option}/${option === 'private' ? userToken : chatroomId}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      if (response.data) {
        setChatroomId(response.data.chatroomId);
        const ChatInfos = response.data.messageInfoList;
        const formattedMessages = ChatInfos.map((message: IFMessageInfo) => ({
          content: message.content,
          senderName: message.senderName,
          senderToken: message.senderToken,
          senderProfileImage: message.senderProfileImage,
          createdAt: message.createdAt,
        }));
        setMessages(formattedMessages);
      }
    } catch {
      // 오류 무시
    }
  }, [chatroomId, option, userToken]);

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
        client.current?.subscribe(`/topic/${option}/${chatroomId}`, message => {
          const chatResponse = JSON.parse(message.body);
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
  }, [chatroomId, option, uid]);

  const sendMessage = () => {
    if (client.current?.connected && input.trim()) {
      const privateChatRequest = {
        chatroomId: chatroomId,
        content: input,
        senderNickname: myNickname,
      };

      const gatheringChatRequest = {
        gatheringId: chatroomId,
        content: input,
        senderNickname: myNickname,
      };

      client.current.publish({
        destination: `/app/${option}`,
        body: option === 'private' ? JSON.stringify(privateChatRequest) : JSON.stringify(gatheringChatRequest),
      });

      setInput('');
    }
  };

  return (
    <div className="flex flex-col w-full h-full pb-2 relative items-center">
      {outMeet && <OutMeet setOutMeet={setOutMeet} />}
      {outChat && <OutChatModal setOutChat={setOutChat} chatroomId={chatroomId} />}
      {modal &&
        (option === 'private' ? (
          <More setModal={setModal} setUserBlock={setUserBlock} setOutChat={setOutChat} />
        ) : (
          <MeetMore setModal={setModal} setOutMeet={setOutMeet} />
        ))}
      {userBlock && <UserBlock setUserBlock={setUserBlock} token={uid || ''} />}
      <div className="w-full">
        <Header setModal={setModal} title={title} />
      </div>

      <Content messages={messages} />
      <Footer input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
}
