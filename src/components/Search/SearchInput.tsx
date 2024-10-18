import { IoSearch } from 'react-icons/io5';

export default function SearchInput() {
  return (
    <div className="flex items-center bg-[#F2F4F8] rounded-md p-2 w-[319px] h-[41px]">
      <IoSearch className="text-[#697077] text-[20px] mr-2" />
      <input
        type="text"
        placeholder="글 제목, 내용"
        className="bg-[#F2F4F8] text-[#697077] focus:outline-none w-full"
      />
    </div>
  );
}
