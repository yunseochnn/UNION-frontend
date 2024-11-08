import { useNavigate } from 'react-router-dom';
import { IFChat } from './Lists';
import dayjs from 'dayjs';
import { FaUsers } from 'react-icons/fa6';

interface Prop {
  chat: IFChat;
}

const List = ({ chat }: Prop) => {
  const navigate = useNavigate();

  const onClickChat = () => {
    if (chat.chatroomType === 'PRIVATE') {
      localStorage.setItem('userToken', chat.userToken);
      navigate(`/chat/private?title=${chat.title}`);
    } else if (chat.chatroomType === 'GATHERING') {
      navigate(`/chat/gathering?title=${chat.title}&chatId=${chat.chatroomId}`);
    }
  };

  return (
    <div className="w-full h-16 flex items-center mt-2 gap-4 cursor-pointer" onClick={onClickChat}>
      <div className="w-14 h-14 rounded-full bg-customGray2  flex-shrink-0 flex justify-center items-center overflow-hidden ">
        {chat.profileImage ? (
          <img src={chat.profileImage} />
        ) : (
          <div>
            <FaUsers size={30} color="white" />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <div className="text-base font-bold">{chat.title}</div>
          {chat.createdAt && (
            <div className="text-sm text-customGray2 font-semibold">
              {dayjs(chat.createdAt).format('MM월 DD일 A H:mm')}
            </div>
          )}
        </div>
        <div className="text-sm text-customGray2 font-semibold">
          {chat.content.length > 23 ? chat.content.slice(0, 22) + '...' : chat.content}
        </div>
      </div>
    </div>
  );
};

export default List;
