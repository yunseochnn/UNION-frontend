import { useNavigate } from 'react-router-dom';
import Post from '../common/Post';

interface Post {
  profileImage: string;
  nickname: string;
  university: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  thumbnail?: string;
  type: string;
  id: number;
}

interface PostListProps {
  posts: Post[];
  lastPostRef?: (node: HTMLDivElement | null) => void;
}

export default function PostList({ posts, lastPostRef }: PostListProps) {
  const navigate = useNavigate();

  const handlePostClick = (post: Post) => {
    navigate(`/board/${post.type}/${post.id}`);
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : null} onClick={() => handlePostClick(post)}>
          <Post
            profileImage={post.profileImage}
            nickname={post.nickname}
            university={post.university}
            title={post.title}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            thumbnail={post.thumbnail}
            type={post.type}
            id={post.id}
            isLast={index === posts.length - 1}
          />
        </div>
      ))}
    </div>
  );
}
