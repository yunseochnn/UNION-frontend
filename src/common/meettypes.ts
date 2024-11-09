// src/common/meettypes.ts
export interface Meeting {
  id: number;
  title: string;
  eupMyeonDong: string; // undefined를 허용하지 않도록 설정
  gatheringDateTime: string;
  currentMember: number;
  maxMember: number;
  views: number;
  thumbnail?: string;
  author: {
    profileImage: string;
    nickname: string;
  };
}
