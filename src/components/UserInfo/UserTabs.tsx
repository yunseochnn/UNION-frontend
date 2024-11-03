import { useState } from 'react';

interface UserTabsProps {
  onTabChange: (tab: string) => void;
  postCount: number;
  commentCount: number;
  meetingCount: number;
}

export default function UserTabs({ onTabChange, postCount, commentCount, meetingCount }: UserTabsProps) {
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div>
      <div className="flex justify-around mt-5">
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${
            activeTab === 'posts' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'
          }`}
          onClick={() => handleTabChange('posts')}
        >
          게시글
          <span className="text-sm text-customGray mt-1">{postCount}</span>
        </button>
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${
            activeTab === 'comments' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'
          }`}
          onClick={() => handleTabChange('comments')}
        >
          댓글
          <span className="text-sm text-customGray mt-1">{commentCount}</span>
        </button>
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${
            activeTab === 'meetings' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'
          }`}
          onClick={() => handleTabChange('meetings')}
        >
          모임글
          <span className="text-sm text-customGray mt-1">{meetingCount}</span>
        </button>
      </div>
    </div>
  );
}
