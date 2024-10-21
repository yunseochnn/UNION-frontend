export default function EditProfileInput() {
  return (
    <div>
      <label htmlFor="nickname" className="text-[16px] text-left block font-semibold mt-7">
        닉네임
      </label>
      <div className="">
        <input
          type="nickname"
          id="nickname"
          placeholder="현재 닉네임"
          className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[40px] rounded-md "
        />
      </div>
      <label htmlFor="nickname" className="text-[16px] text-left block font-semibold mt-5">
        한 줄 소개
      </label>
      <div className="">
        <input
          type="nickname"
          id="nickname"
          placeholder="현재 자기 소개가 들어갑니다"
          className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[93px] rounded-md"
        />
      </div>
      <div className="text-center mt-5 ">
        <button className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md">
          변경하기
        </button>
      </div>
    </div>
  );
}
