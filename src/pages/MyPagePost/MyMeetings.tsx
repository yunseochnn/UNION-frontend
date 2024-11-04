import MyPageList from '../../pages/MyPageList';

export default function MyMeetings() {
  const meetings = [
    {
      id: 1,
      type: 'FREE',
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '코딩 스터디 모집',
      content: '매주 토요일 진행하는 코딩 스터디입니다.',
      likes: 98,
      comments: 20,
      thumbnail: '/Logo.svg',
    },
    {
      id: 2,
      type: 'FREE',
      profileImage: '/Logo.svg',
      nickname: '찐 감자',
      university: '구름대학교',
      title: '알고리즘 스터디 모집',
      content: '매주 화요일 진행하는 알고리즘 스터디입니다.',
      likes: 102,
      comments: 17,
      thumbnail: '/Logo.svg',
    },
  ];

  return <MyPageList posts={meetings} pageTitle="내가 작성한 모임글" />;
}
