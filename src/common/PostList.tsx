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
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={index}
          profileImage={post.profileImage}
          nickname={post.nickname}
          university={post.university}
          title={post.title}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          thumbnail={post.thumbnail}
        />
      ))}
    </div>
  );
}
