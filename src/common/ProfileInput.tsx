interface ProfileProps {
  nickname: string;
  description: string;
  onNicknameChange: (nickname: string) => void;
  onDescriptionChange: (description: string) => void;
}

export default function ProfileInput({ nickname, description, onNicknameChange, onDescriptionChange }: ProfileProps) {
  return (
    <div>
      <label htmlFor="nickname" className="text-[16px] text-left block font-semibold mt-7">
        닉네임
      </label>
      <input
        type="text"
        id="nickname"
        placeholder="현재 닉네임"
        value={nickname}
        onChange={e => onNicknameChange(e.target.value)}
        className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[40px] rounded-md"
      />

      <label htmlFor="bio" className="text-[16px] text-left block font-semibold mt-5">
        한 줄 소개
      </label>
      <textarea
        id="bio"
        placeholder="소개를 적어주세요"
        value={description}
        onChange={e => onDescriptionChange(e.target.value)}
        maxLength={50}
        className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[63px] rounded-md resize-none"
      />
    </div>
  );
}
