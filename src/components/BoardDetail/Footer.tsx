import React, { useEffect, useRef, useState } from 'react';
import { LuPencil, LuSendHorizonal } from 'react-icons/lu';
import { UpComment } from '../../pages/BoardDetail';
import { IoClose } from 'react-icons/io5';

interface FooterProps {
  handleAddComment: (newComment: string) => void;
  handleUpdateComment: ({ content, commentId }: { content: string; commentId: number }) => void;
  updateComment: UpComment | null;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
}

const Footer = ({ handleAddComment, handleUpdateComment, updateComment, setUpdateComment }: FooterProps) => {
  const [comment, setComment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // input 요소에 대한 참조 생성

  useEffect(() => {
    if (updateComment) {
      setComment(updateComment.content);
      inputRef.current?.focus(); // updateComment가 있을 때 포커스 설정
    }
  }, [updateComment]);

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment !== '') {
      handleAddComment(comment);
      setComment('');
      console.log('댓글달기');
    }
  };

  const onUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment !== '' && updateComment) {
      handleUpdateComment({ content: comment, commentId: updateComment?.commentId });
      setComment('');
      setUpdateComment(null);
    }
  };

  const handleCancleUpdate = () => {
    setComment('');
    setUpdateComment(null);
  };

  return (
    <>
      {updateComment ? (
        <form className="h-14 flex items-center justify-between" onSubmit={onUpdateComment}>
          <div onClick={handleCancleUpdate} className="cursor-pointer">
            <IoClose size={20} />
          </div>
          <div className="w-[85%]">
            <input
              className="bg-gray-100 w-full h-10 rounded-full py-2 px-4 outline-none placeholder-black"
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              ref={inputRef}
            />
          </div>
          <button type="submit">
            {' '}
            <LuPencil size={20} />
          </button>
        </form>
      ) : (
        <form className="h-14 flex items-center justify-between " onSubmit={onSubmitComment}>
          <div className="w-[90%]">
            <input
              className="bg-gray-100 w-full h-10 rounded-full py-2 px-4 outline-none"
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
              ref={inputRef}
            />
          </div>
          <button type="submit">
            {' '}
            <LuSendHorizonal size={20} />
          </button>
        </form>
      )}
    </>
  );
};

export default Footer;
