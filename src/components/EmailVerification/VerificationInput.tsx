export default function VerificationInput() {
  return (
    <div className="font-semibold">
      <div className="mt-[100px]">
        <div className="mt-6 border-b-[1.3px] border-customGray">
          <label htmlFor="university" className="text-[15px] text-left block">
            학교 이름
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="university"
              placeholder="학교 이름을 입력해주세요"
              className="text-[15px]  placeholder-gray-400  focus:outline-none p-2 w-full mt-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mt-6 text-[15px] text-left block">
            이메일
          </label>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              placeholder="학교 이메일을 입력해주세요"
              className="text-[15px] border-b-[1.3px] border-customGray placeholder-gray-400 focus:outline-none p-2 w-full mt-2"
            />
            <button className="text-[14px] px-3 py-2 ml-2 bg-mainColor text-white  rounded-md whitespace-nowrap">
              인증 요청
            </button>
          </div>
        </div>
        <div className="mt-6 border-b-[1.3px] border-customGray">
          <label htmlFor="verification" className="text-[15px] text-left block">
            인증번호
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="verification"
              placeholder="인증번호를 입력해주세요"
              className="text-[15px]  placeholder-gray-400  focus:outline-none p-2 w-full mt-2"
            />
            <span className=" text-mainColor mr-2">3:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
