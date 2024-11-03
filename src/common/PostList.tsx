import Post from '../common/Post';

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

interface PostListProps {
  posts: Post[];
  lastPostRef?: (node: HTMLDivElement | null) => void;
}

export default function PostList({ posts, lastPostRef }: PostListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} ref={index === posts.length - 1 ? lastPostRef : null}>
          <Post
            profileImage={post.profileImage}
            nickname={post.nickname}
            university={post.university}
            title={post.title}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            thumbnail={post.thumbnail}
          />
        </div>
      ))}
    </div>
  );
}
