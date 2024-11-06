import Policy from '../../common/Policy';
import '../../style.css';
import { IFMessageInfo } from '../../pages/ChatDetail';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
  messages: IFMessageInfo[] | undefined;
}

const Content = ({ messages }: Props) => {
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const onClickChatProfile = (token: string) => {
    localStorage.setItem('userToken', token);
    navigate('/userinfo');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  let lastDate = '';

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar w-[85%]">
      <div>
        <Policy />
      </div>

      <div className="mt-2 w-full">
        {messages?.map((message, index) => {
          const currentDate = dayjs(message.createdAt).format('YYYY년 MM월 DD일');
          let showDateHeader = false;

          if (currentDate !== lastDate) {
            showDateHeader = true;
            lastDate = currentDate;
          }
          return (
            <div key={index}>
              {showDateHeader && (
                <div className="w-full flex justify-center">
                  <div className="text-sm font-semibold text-customGray2">
                    {dayjs(message.createdAt).format('YYYY년 MM월 DD일')}
                  </div>
                </div>
              )}

              {message.senderToken === '' ? (
                <div className="w-full mt-4 flex justify-center items-center">
                  <div className="text-gray-400 rounded-full px-11 text-sm font-medium">{message.content}</div>
                </div>
              ) : message.senderName === myNickname ? (
                <div className="w-full flex justify-end mt-4">
                  <div className="flex items-end mr-2">
                    <div className="text-xs text-customGray2">{dayjs(message.createdAt).format('A h시 mm분')}</div>
                  </div>

                  <div
                    className="max-w-[60%] h-auto text-xs  rounded-xl flex items-center justify-center p-3 text-white font-semibold"
                    style={{ backgroundColor: '#ff4a4d' }}
                  >
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="flex mt-4">
                  <div
                    className="h-10 w-10 rounded-full bg-gray-300"
                    onClick={() => onClickChatProfile(message.senderToken)}
                  >
                    {' '}
                    <img src={message.senderProfileImage} />
                  </div>
                  <div className="ml-3 ">
                    <div className="text-sm font-semibold">{message.senderName}</div>
                    <div className="max-w-[60%] h-auto text-xs bg-gray-200 rounded-xl flex items-center justify-center p-3 font-semibold">
                      {message.content}
                    </div>
                  </div>
                  <div className="flex items-end ml-2">
                    <div className="text-xs text-gray-400">{dayjs(message.createdAt).format('A h시 mm분')}</div>
                  </div>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
