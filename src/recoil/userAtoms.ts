import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    oauthUserToken: '',
    token: '',
    univName: '',
    nickname: '',
    description: '',
    profileImage: '',
  },
});
