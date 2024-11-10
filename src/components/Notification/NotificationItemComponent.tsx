import React from 'react';

import { PiMapPinFill } from 'react-icons/pi';
import { BiComment } from 'react-icons/bi';
import { NotificationItem } from '../../types/NotificationTypes';

interface NotificationItemComponentProps {
  notification: NotificationItem;
  onClick: (notification: NotificationItem) => void;
}

const NotificationItemComponent: React.FC<NotificationItemComponentProps> = ({ notification, onClick }) => {
  const getIcon = (type: string) => {
    return type.toLowerCase() === 'gathering' ? (
      <PiMapPinFill className="text-customGray2 w-5 h-5" />
    ) : (
      <BiComment className="text-customGray2 w-5 h-5" />
    );
  };

  const getMessageTitle = (notification: NotificationItem): JSX.Element => {
    switch (notification.type.toLowerCase()) {
      case 'post':
        return (
          <div className="flex">
            <div className="font-semibold max-w-[70px] truncate mr-1">{notification.nickname}</div>
            님이
            <div className="font-semibold max-w-[100px] truncate mx-1">{notification.title}</div>에 댓글을 남겼습니다.
          </div>
        );
      case 'comment':
        return (
          <div className="flex">
            <div className="font-semibold truncate max-w-[70px] mr-1">{notification.nickname}</div>님이
            <div className="font-semibold truncate max-w-[120px] mx-1">{notification.title}</div>에 답글을 남겼습니다.
          </div>
        );
      case 'gathering':
        return (
          <div className="flex">
            <div className="font-semibold truncate max-w-[70px] mr-1">{notification.nickname}</div>님이 모임
            <div className="font-semibold truncate max-w-[100px] mx-1">{notification.title}</div>에 참여했습니다.
          </div>
        );
      default:
        return <>{notification.title || '알림'}</>;
    }
  };

  const getMessageContent = (notification: NotificationItem): string | null => {
    if (notification.type.toLowerCase() === 'gathering') {
      return null; // 모임 참여의 경우 추가 내용이 필요 없음
    }
    return notification.content;
  };

  return (
    <div
      onClick={() => onClick(notification)}
      className={`flex flex-row items-center p-4 space-x-3 cursor-pointer ${!notification.isRead ? 'bg-pink-50' : ''}`}
    >
      {/* 아이콘 */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
        {getIcon(notification.type)}
      </div>

      {/* 알림 메시지 */}
      <div className="flex flex-col items-start space-y-1">
        <div className="text-[14px] text-customgray1 ">{getMessageTitle(notification)}</div>
        {notification.content && <div className="text-[13px] text-customgray2 ">{getMessageContent(notification)}</div>}
        <span className="text-xs text-customGray2">
          {new Date(notification.createdAt).toLocaleString('ko-KR', {
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

export default NotificationItemComponent;
