import { useState } from 'react';

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState('posts');

  const userData = {
    posts: ['게시글 1', '게시글 2', '게시글 3'],
    comments: ['댓글 1', '댓글 2', '댓글 3'],
    meetings: ['모임글 1', '모임글 2', '모임글 3'],
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-around mt-5">
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${activeTab === 'posts' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'}`}
          onClick={() => handleTabChange('posts')}
        >
          게시글
          <span className="text-sm text-customGray mt-1">{userData.posts.length}개</span>
        </button>
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${activeTab === 'comments' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'}`}
          onClick={() => handleTabChange('comments')}
        >
          댓글
          <span className="text-sm text-customGray mt-1">{userData.comments.length}개</span>
        </button>

        {/* 모임글 탭 */}
        <button
          className={`text-[17px] font-semibold p-2 flex flex-col items-center ${activeTab === 'meetings' ? 'text-mainColor border-b-2 border-mainColor' : 'text-customBlack'}`}
          onClick={() => handleTabChange('meetings')}
        >
          모임글
          <span className="text-sm text-customGray mt-1">{userData.meetings.length}개</span>
        </button>
      </div>
      <div className="mt-5">
        {activeTab === 'posts' && (
          <div>
            {userData.posts.map((post, index) => (
              <p key={index}>{post}</p>
            ))}
          </div>
        )}
        {activeTab === 'comments' && (
          <div>
            {userData.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        )}
        {activeTab === 'meetings' && (
          <div>
            {userData.meetings.map((meeting, index) => (
              <p key={index}>{meeting}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
