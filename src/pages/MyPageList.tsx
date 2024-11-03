import { HiOutlinePencilSquare } from 'react-icons/hi2';
import Header from '../common/Header';
import PostList from '../common/PostList';

interface Post {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail: string;
}

interface MyPageListProps {
  posts: Post[];
  pageTitle: string;
  lastPostRef?: (node: HTMLDivElement | null) => void;
}

export default function MyPageList({ posts, pageTitle, lastPostRef }: MyPageListProps) {
  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header title={pageTitle} navigateTo="/mypage" />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        {posts.length > 0 ? (
          <PostList posts={posts} lastPostRef={lastPostRef} />
        ) : (
          <div className="flex flex-col items-center h-full text-customGray2 mt-[170px] text-[18px]">
            <HiOutlinePencilSquare size={50} className="mb-1" />
            작성한 글이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
