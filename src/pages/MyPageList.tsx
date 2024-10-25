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
}

export default function MyPageList({ posts, pageTitle }: MyPageListProps) {
  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header title={pageTitle} navigateTo="/mypage" />
      </div>
      <div className="flex-grow overflow-y-auto hidden-scrollbar">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
