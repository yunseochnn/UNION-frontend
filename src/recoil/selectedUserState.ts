import { atom } from 'recoil';

export const selectedUserState = atom<string | null>({
  key: 'selectedUserState',
  default: null,
});
