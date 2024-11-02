import { useNavigate } from 'react-router-dom';
import { IFChat } from './Lists';

interface Prop {
  filter: string;
  chat: IFChat;
}

const List = ({ filter, chat }: Prop) => {
  const navigate = useNavigate();

  const onClickChat = () => {
    if (filter === 'private') {
      navigate(`/chat/private?uid=${chat.senderToken}&title=${chat.senderName}`);
    }
  };

  return (
    <div className="w-full h-16 flex items-center mt-2 gap-4 cursor-pointer" onClick={onClickChat}>
      <div className="w-14 h-14 rounded-full bg-gray-300 flex-shrink-0">
        {chat.senderProfileImage && <img src={chat.senderProfileImage} />}
      </div>

      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <div className="text-base font-bold">{chat.senderName}</div>
          <div className="text-sm text-customGray2 font-semibold">{chat.createdAt}</div>
        </div>
        <div className="text-sm text-customGray2 font-semibold">
          {chat.content.length > 23 ? chat.content.slice(0, 22) + '...' : chat.content}
        </div>
      </div>
    </div>
  );
};

export default List;
