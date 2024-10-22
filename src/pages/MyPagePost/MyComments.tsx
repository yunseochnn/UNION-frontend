import MyPageList from '../../pages/MyPageList';

export default function MyComments() {
  const comments = [
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '코딩 스터디 후기',
      content: '이번 주 코딩 스터디에 대한 간단한 후기를 남깁니다.',
      likes: 33,
      comments: 5,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
    {
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '스터디 경험',
      content: '알고리즘 스터디가 정말 도움이 많이 되었습니다.',
      likes: 29,
      comments: 3,
      thumbnail: '/Logo.svg',
    },
  ];

  return <MyPageList posts={comments} pageTitle="내가 작성한 댓글" />;
}
