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
  type: string;
  id: number;
}

interface MyPageListProps {
  posts: Post[];
  pageTitle: string;
  lastPostRef?: (node: HTMLDivElement | null) => void;
}

export default function MyPageList({ posts, pageTitle, lastPostRef }: MyPageListProps) {
  const emptyMessage = (() => {
    switch (pageTitle) {
      case '내가 작성한 게시물':
        return '작성한 게시물이 없습니다';
      case '내가 작성한 모임글':
        return '작성한 모임글이 없습니다';
      case '내가 댓글 단 글':
        return '댓글 단 글이 없습니다';
      default:
        return '게시물이 없습니다';
    }
  })();

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header title={pageTitle} />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        {posts.length > 0 ? (
          <PostList posts={posts} lastPostRef={lastPostRef} />
        ) : (
          <div className="flex flex-col items-center h-full text-customGray2 mt-[170px] text-[18px]">
            <HiOutlinePencilSquare size={50} className="mb-1" />
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
