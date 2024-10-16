import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';

const EmptyComment = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
      <div>
        <HiOutlineChatBubbleOvalLeft size={70} />
      </div>
      <div className="text-lg">첫 댓글을 남겨주세요.</div>
    </div>
  );
};

export default EmptyComment;
