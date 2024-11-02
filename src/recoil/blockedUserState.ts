import { atom } from 'recoil';

export interface BlockedUser {
  token: string;
  nickname: string;
  description: string;
  univName: string;
  profileImage: string;
  isBlocked: boolean;
}

export const blockedUserState = atom<BlockedUser[]>({
  key: 'blockedUserState',
  default: [],
});
