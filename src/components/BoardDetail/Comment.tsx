import { useCallback, useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IFComment, ParentInfo, UpComment } from '../../pages/BoardDetail';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { selectedUserState } from '../../recoil/selectedUserState';
import { useNavigate } from 'react-router-dom';

interface Prop {
  comment: IFComment;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParent: React.Dispatch<React.SetStateAction<ParentInfo>>;
  handleDeleteComment: (commentId: number) => void;
  parent: ParentInfo;
  footerRef: React.RefObject<HTMLDivElement>;
}

const Comment = ({ comment, setUpdateComment, setParent, handleDeleteComment, parent, footerRef }: Prop) => {
  const [like, setLike] = useState(false);
  const [more, setMore] = useState(false);
  const setUser = useSetRecoilState(selectedUserState);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null); //요소를 참조하는 useRef
  const commentRef = useRef<HTMLDivElement | null>(null);
  const myNickname = localStorage.getItem('nickname');

  const handleClickOutSide = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setMore(false);
    }
  }, []);

  const handleClickCommentOutSide = useCallback(
    (e: MouseEvent) => {
      if (
        commentRef.current &&
        footerRef.current &&
        !commentRef.current.contains(e.target as Node) &&
        !footerRef.current.contains(e.target as Node)
      ) {
        setParent({ id: null, nickname: null });
      }
    },
    [footerRef, setParent],
  );

  const onClickLikeHandler = () => {
    setLike(!like);
  };

  const onClickMoreHandler = () => {
    setMore(true);
  };

  const onAddComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setParent({ id: comment.id, nickname: comment.commenter.nickname });
    setMore(false);
  };

  const onUpdateComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setUpdateComment({ content: comment.content, commentId: comment.id });
    setMore(false);
  };

  const onDeleteComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleDeleteComment(comment.id);
    setMore(false);
  };

  const onClickCommentProfile = () => {
    if (comment.commenter.nickname === myNickname) return;

    if (comment.commenter.profileImage) {
      setUser(comment.commenter.token);
      localStorage.setItem('userToken', comment.commenter.token);
      navigate('/userinfo');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      //컴포넌트가 언마운트될 때 이벤트 리스너 해제
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [handleClickOutSide]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickCommentOutSide);

    return () => document.removeEventListener('mousedown', handleClickCommentOutSide);
  }, [handleClickCommentOutSide]);

  return (
    <>
      <div
        className={`px-2 h-[70px] flex justify-between items-center ${comment.parentId ? 'pl-12' : ''} ${
          parent.id === comment.id ? 'bg-red-100' : ''
        }`}
        ref={commentRef}
      >
        <div className="flex gap-3 items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden cursor-pointer" onClick={onClickCommentProfile}>
            <img src={comment.commenter.profileImage || ''} />
          </div>
          <div className="flex flex-col ">
            <div className="flex gap-1 items-center">
              <div className="font-bold text-base">{comment.commenter.nickname}</div>
              <div className="text-gray-400 font-semibold text-xs">{comment.commenter.univName}</div>
            </div>

            <div className="text-[10px] text-gray-400">{`${dayjs(comment.createdAt).format('MM월 DD일 H:mm')}`}</div>

            <div className="text-sm font-semibold flex">
              {comment.parentNickname && comment.parentNickname !== comment.commenter.nickname && (
                <span className="font-bold mr-1" style={{ color: '#ff4a4d' }}>{`@${comment.parentNickname} `}</span>
              )}
              <span>{comment.content}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex relative cursor-pointer" onClick={onClickMoreHandler} ref={ref}>
            {more && (
              <div className="bg-white font-medium shadow-lg rounded-md absolute w-28 h-auto right-1 bottom-4 py-1 z-40">
                <div className="border-b border-gray-300 px-2" onClick={onAddComment}>
                  대댓글 달기
                </div>
                {comment.commenter.nickname === myNickname && (
                  <>
                    <div className="border-b border-gray-300 px-2" onClick={onUpdateComment}>
                      수정하기
                    </div>
                    <div className="border-b border-gray-300 px-2" onClick={onDeleteComment}>
                      삭제하기
                    </div>
                  </>
                )}
                {comment.commenter.nickname !== myNickname && <div className="px-2">채팅보내기</div>}
              </div>
            )}
            <MdOutlineMoreHoriz size={25} />
          </div>

          <div className={`flex items-center gap-1 ${comment.parentId ? 'pl-1' : ''}`}>
            <span onClick={onClickLikeHandler} className="cursor-pointer">
              {like ? <FaHeart size={14} color="#ff4a4d" /> : <FaRegHeart size={14} />}{' '}
            </span>
            <span className="text-sm font-semibold">{comment.commentLikes}</span>
          </div>
        </div>
      </div>

      {comment.children && comment.children.length > 0 && (
        <>
          {comment.children.map((childComment, index) => (
            <div key={index}>
              <Comment
                footerRef={footerRef}
                parent={parent}
                comment={childComment}
                setUpdateComment={setUpdateComment}
                setParent={setParent}
                handleDeleteComment={handleDeleteComment}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
