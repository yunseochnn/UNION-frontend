import { useState } from 'react';
import '../../style.css';
import List from './List';
import apiClient from '../../api/apiClient';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export interface IFChat {
  title: string;
  chatroomId: 12345;
  chatroomType: string;
  content: string;
  userToken: string;
  profileImage: string;
  createdAt: string;
}

const Lists = () => {
  const [filter, setFilter] = useState('private');

  //채팅 리스트 조회
  const {
    data: chatList,
    isError: isChatError,
    error: chatError,
  } = useQuery<IFChat[]>({
    queryKey: ['chatList', filter],
    queryFn: async () => {
      const response = await apiClient.get<IFChat[]>(`/chat/${filter}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      console.log('목록 조회 완료');
      return response.data;
    },
    retry: false,
  });

  if (isChatError) {
    console.log(`채팅 목록 에러 : ${chatError}`);
  }

  return (
    <div className="flex flex-col mt-5">
      <div className="flex gap-3 font-semibold">
        <span
          className={`cursor-pointer ${filter === 'gathering' ? 'text-gray-400' : 'text-black'}`}
          onClick={() => setFilter('private')}
        >
          개인
        </span>
        <span
          className={`cursor-pointer ${filter === 'gathering' ? 'text-black' : 'text-gray-400'}`}
          onClick={() => setFilter('gathering')}
        >
          모임
        </span>
      </div>

      <div className="mt-3">
        {chatList?.map((chat, index) => (
          <div key={index}>
            <List chat={chat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
