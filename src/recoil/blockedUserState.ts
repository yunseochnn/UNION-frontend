import { atom } from 'recoil';

export const blockedUserState = atom({
  key: 'blockedUserState',
  default: false,
});
