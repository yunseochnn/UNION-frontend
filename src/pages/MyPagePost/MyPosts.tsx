import MyPageList from '../../pages/MyPageList';

export default function MyPosts() {
  const posts = [
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '첫 번째 게시물첫 번째 게시물첫 번째 게시물첫 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/i.avif',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '두 번째 게시물',
      content: '게시물 내용이 여기 들어갑니다. 아주 간단한 내용입니다.',
      likes: 120,
      comments: 15,
      thumbnail: '/2.jpeg',
    },
  ];

  return <MyPageList posts={posts} pageTitle="내가 작성한 게시물" />;
}
