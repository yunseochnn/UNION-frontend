import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    oauthUserToken: '',
    univName: '',
    nickname: '',
    description: '',
    profileImage: '',
  },
});
