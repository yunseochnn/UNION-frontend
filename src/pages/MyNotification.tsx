import React, { useEffect, useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiClient from '../api/apiClient';
import { NotificationItem } from '../types/NotificationTypes';
import NotificationItemComponent from '../components/Notification/NotificationItemComponent';
import Header from '../components/Notification/Header';

const MyNotification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const SIZE = 10;

  const fetchNotifications = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await apiClient.get('/notification/read', {
        params: { page, size: SIZE },
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      });
      const newNotifications = response.data.notifications;
      if (Array.isArray(newNotifications)) {
        setNotifications(prev => [...prev, ...newNotifications]);
        setHasMore(newNotifications.length === SIZE);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('알림 목록 조회 중 오류 발생:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const markNotificationAsRead = async (id: number) => {
    try {
      await apiClient.put(
        '/notification/read',
        { id },
        {
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        },
      );
      setNotifications(prev =>
        prev.map(notification => (notification.id === id ? { ...notification, isRead: true } : notification)),
      );
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    markNotificationAsRead(notification.id);
    switch (notification.type) {
      case 'POST':
      case 'COMMENT':
        navigate(`/board/${notification.postType}/${notification.typeId}`);
        break;
      case 'GATHERING':
        navigate(`/meet/${notification.typeId}`);
        break;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="center-content flex flex-col bg-white h-full">
      <Header title="알림" />

      <div className="flex-1 overflow-y-auto hidden-scrollbar">
        {notifications.map(notification => (
          <NotificationItemComponent
            key={notification.id}
            notification={notification}
            onClick={handleNotificationClick}
          />
        ))}

        {loading && <div className="p-4 text-center text-gray-500"></div>}
        {!hasMore && notifications.length > 0 && <div className="p-3 text-center text-customgray2 text-[14px]"></div>}
        {!loading && notifications.length === 0 && (
          <div className="p-3 text-center text-customGray2">알림이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default MyNotification;
