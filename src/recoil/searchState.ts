import { atom } from 'recoil';

export const searchKeywordState = atom<string>({
  key: 'searchKeywordState',
  default: '',
});

export const boardTypeState = atom<string>({
  key: 'boardTypeState',
  default: 'ALL',
});
