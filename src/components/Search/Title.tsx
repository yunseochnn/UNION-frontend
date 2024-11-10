import { IoSearch } from 'react-icons/io5';
export default function Title() {
  return (
    <div className="flex flex-col items-center mt-[50%]">
      <IoSearch className="text-[64px] text-[#C0C3C7] mb-4" />
      <p className="text-[18px] text-[#9EA1A5]">글을 검색해보세요</p>
    </div>
  );
}
