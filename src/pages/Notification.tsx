//알림을 누르면 게시물 페이지로 이동하는것 구현해야함
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
 id: number;
 title: string;
 message: string;
 timestamp: string;
 isHighlighted?: boolean;
}

const Notification: React.FC = () => {
 const navigate = useNavigate();
 
 const notifications: NotificationItem[] = [
  {
    id: 1,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: true
  },
  {
    id: 2, 
    title: '1학기 행운을 빌어줘🍀',
    message: '이번엔 무슨 내용을 적어볼까 고민중이야.',
    timestamp: '8/30 11:18',
    isHighlighted: true
  },
  {
    id: 3,
    title: '긴급 알림',
    message: '긴급 정검으로 인해 잠시 후 약 30분 동안 접속이 불가할 예정입니다.',
    timestamp: '8/30 11:18'
  },
  {
    id: 4,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: false
  },
  {
    id: 5,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: true
  },
  {
    id: 6,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: false
  },
  {
    id: 7,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: true
  },
  {
    id: 8,
    title: '2학기 행운을 빌어줘🍀',
    message: '테마파크 할인혜택으로 마지막 주말 불태우자!',
    timestamp: '8/30 11:18',
    isHighlighted: false
  }
 ];





 return (
   <div className="center-content flex flex-col bg-white h-full">
     {/* 헤더 */}
     <header className="flex items-center p-4 border-b">
       <button onClick={() => navigate(-1)} className="mr-4">
         <IoChevronBack size={24} />
       </button>
       <h1 className="text-xl font-semibold flex-1 text-center mr-8">알림</h1>
     </header>

     {/* 알림 목록 */}
     <main className="flex-1 overflow-y-auto">
       {notifications.map((notification) => (
         <div
           key={notification.id}
           className={`flex items-start p-4 space-x-3 ${
             notification.isHighlighted ? 'bg-pink-50' : ''
           }`}
         >
           <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
           <div className="flex-1">
             <h3 className="font-medium">{notification.title}</h3>
             <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
             <span className="text-xs text-gray-400 mt-1">{notification.timestamp}</span>
           </div>
         </div>
       ))}
     </main>
   </div>
 );
};

export default Notification;