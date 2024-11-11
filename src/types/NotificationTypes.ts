export interface NotificationItem {
  id: number;
  type: string;
  typeId: number;
  nickname: string;
  title: string;
  content: string | null;
  createdAt: string;
  isRead: boolean;
  postType: string;
}
