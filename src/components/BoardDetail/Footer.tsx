import { FaPlus } from 'react-icons/fa6';
import { LuSendHorizonal } from 'react-icons/lu';

const Footer = () => {
  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('댓글달기');
  };
  return (
    <form className="h-14 flex items-center justify-between" onSubmit={onSubmitComment}>
      <div>
        <FaPlus size={20} />
      </div>
      <div className="w-[85%]">
        <input
          className="bg-gray-100 w-full h-10 rounded-full py-2 px-4 outline-none"
          type="text"
          placeholder="댓글을 입력해주세요"
        />
      </div>
      <button type="submit">
        {' '}
        <LuSendHorizonal size={20} />
      </button>
    </form>
  );
};

export default Footer;
