// Notification.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { notificationApi } from '../api/NotificationApi';
import type { NotificationItem } from '../api/NotificationApi';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const SIZE = 20;

  // 알림 목록 조회
  const fetchNotifications = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await notificationApi.getNotifications(page, SIZE);
      
      // response와 notifications 필드의 존재 여부를 확인
      if (response && Array.isArray(response.notifications)) {
        const newNotifications = response.notifications;
        
        if (newNotifications.length > 0) {
          setNotifications(prev => [...prev, ...newNotifications]);
          setHasMore(newNotifications.length === SIZE);
          setPage(prev => prev + 1);
        } else {
          setHasMore(false);
        }
      } else {
        console.error('알림 데이터 형식이 올바르지 않습니다:', response);
        setHasMore(false);
      }
    } catch (error) {
      console.error('알림 조회 중 오류가 발생했습니다:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  // 알림 클릭 처리
  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.isRead) {
      try {
        const success = await notificationApi.markAsRead(page, SIZE);
        
        if (success) {
          setNotifications(prev =>
            prev.map(notif =>
              notif.id === notification.id ? { ...notif, isRead: true } : notif
            )
          );
        }
      } catch (error) {
        console.error('알림 읽음 처리 중 오류가 발생했습니다:', error);
      }
    }

    // 타입에 따른 페이지 이동
    try {
      switch (notification.type) {
        case 'post':
          navigate(`/posts/${notification.typeId}`);
          break;
        case 'comment':
          navigate(`/comments/${notification.typeId}`);
          break;
        case 'gathering':
          navigate(`/gatherings/${notification.typeId}`);
          break;
      }
    } catch (error) {
      console.error('페이지 이동 중 오류가 발생했습니다:', error);
    }
  };

  // 메시지 생성 함수
  const getMessage = useCallback((notification: NotificationItem): string => {
    try {
      switch (notification.type) {
        case 'post':
          return `${notification.nickname}님이 회원님의 게시글에 댓글을 남겼습니다: "${notification.title}"`;
        case 'comment':
          return `${notification.nickname}님이 회원님의 댓글에 답글을 남겼습니다: "${notification.title}"`;
        case 'gathering':
          return `${notification.nickname}님이 모임에 참여했습니다: "${notification.title}"`;
        default:
          return notification.title || '알림';
      }
    } catch (error) {
      console.error('메시지 생성 중 오류가 발생했습니다:', error);
      return '알림';
    }
  }, []);

  // 무한 스크롤 이벤트 핸들러
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const handleScroll = (e: Event) => {
      try {
        const target = e.target as HTMLDivElement;
        const { scrollTop, clientHeight, scrollHeight } = target;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
          fetchNotifications();
        }
      } catch (error) {
        console.error('스크롤 처리 중 오류가 발생했습니다:', error);
      }
    };

    mainElement.addEventListener('scroll', handleScroll);
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, fetchNotifications]);

  // 초기 데이터 로딩
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="center-content flex flex-col bg-white h-full">
      <header className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="mr-4">
          <IoChevronBack size={24} />
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center mr-8">알림</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        {Array.isArray(notifications) && notifications.map(notification => (
          <div
            key={notification?.id || Math.random()}
            onClick={() => notification && handleNotificationClick(notification)}
            className={`flex items-start p-4 space-x-3 cursor-pointer ${
              notification?.isRead === false ? 'bg-pink-50' : ''
            }`}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">{notification && getMessage(notification)}</p>
              <span className="text-xs text-gray-400 mt-1">
                {notification?.createdAt && new Date(notification.createdAt).toLocaleString('ko-KR', {
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="p-4 text-center text-gray-500">
            불러오는 중...
          </div>
        )}
        
        {!hasMore && notifications.length > 0 && (
          <div className="p-4 text-center text-gray-500">
            모든 알림을 불러왔습니다
          </div>
        )}
        
        {!loading && (!notifications || notifications.length === 0) && (
          <div className="p-4 text-center text-gray-500">
            알림이 없습니다
          </div>
        )}
      </main>
    </div>
  );
};

export default Notification;