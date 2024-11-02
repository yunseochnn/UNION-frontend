import MyPageList from '../../pages/MyPageList';

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

export default function MyComments() {
  const comments: Post[] = [];

  return <MyPageList posts={comments} pageTitle="내가 댓글 단 글" />;
}
