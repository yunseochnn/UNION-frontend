import { useCallback, useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IFComment, ParentInfo, UpComment } from '../../pages/BoardDetail';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { selectedUserState } from '../../recoil/selectedUserState';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';
import 'dayjs/locale/ko';
import DeleteComment from './DeleteComment';
dayjs.locale('ko');

interface Prop {
  comment: IFComment;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParent: React.Dispatch<React.SetStateAction<ParentInfo>>;
  handleDeleteComment: (commentId: number) => void;
  parent: ParentInfo;
  footerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  refetchComment: () => void;
  getBestComment: () => void;
}

const Comment = ({
  comment,
  setUpdateComment,
  setParent,
  handleDeleteComment,
  parent,
  footerRef,
  inputRef,
  refetchComment,
  getBestComment,
}: Prop) => {
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
        setParent({ id: null, nickname: null, token: null });
      }
    },
    [footerRef, setParent],
  );

  const onClickMoreHandler = () => {
    setMore(true);
  };

  const onAddComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setUpdateComment(null);
    setParent({ id: comment.id, nickname: comment.commenter.nickname, token: comment.commenter.token });
    inputRef.current?.focus();
    setMore(false);
  };

  const onUpdateComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setUpdateComment({ content: comment.content, commentId: comment.id });
    setMore(false);
  };

  const onDeleteComment = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setUpdateComment(null);
    handleDeleteComment(comment.id);
    setMore(false);
  };

  const onClickCommentProfile = () => {
    if (comment.commenter.profileImage) {
      setUpdateComment(null);
      setUser(comment.commenter.token);
      localStorage.setItem('userToken', comment.commenter.token);
      navigate('/userinfo');
    }
  };

  const onClickPrivateChat = (token: string, name: string) => {
    localStorage.setItem('userToken', token);
    setUpdateComment(null);
    navigate(`/chat/private?title=${name}`);
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

  const onClickLike = async () => {
    try {
      await apiClient.post(
        `/comment/like/${comment.id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      );
      refetchComment();
      getBestComment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {comment.deleted ? (
        <DeleteComment comment={comment} />
      ) : (
        <div
          className={`px-2 py-2 h-auto flex justify-between items-center ${comment.parentId ? 'pl-12' : ''} ${
            parent.id === comment.id ? 'bg-red-100' : ''
          }`}
          ref={commentRef}
        >
          <div className="flex gap-3 w-full">
            <div className="flex mt-2">
              <div
                className={`h-12 w-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 ${
                  comment.commenter.nickname === myNickname ? 'cursor-default' : 'cursor-pointer'
                }`}
                onClick={comment.commenter.nickname === myNickname ? undefined : onClickCommentProfile}
              >
                <img src={comment.commenter.profileImage || ''} />
              </div>
            </div>

            <div className="flex items-center w-full">
              <div className="flex flex-col justify-start w-[90%]">
                <div style={{ lineHeight: 0.8 }}>
                  <div className="flex gap-1 items-center">
                    <div className="font-bold text-base">{comment.commenter.nickname}</div>
                    <div className="text-customGray2 font-semibold text-xs">{comment.commenter.univName}</div>
                  </div>

                  <div className="text-[10px] text-customGray2 font-medium">{`${dayjs(comment.createdAt).format(
                    'MM/DD A H:mm',
                  )}`}</div>
                </div>

                <div className="text-sm font-semibold flex mt-1">
                  {comment.parentNickname && comment.parentNickname !== comment.commenter.nickname ? (
                    <span className="">
                      <span className="font-bold mr-1" style={{ color: '#ff4a4d' }}>
                        @{comment.parentNickname}
                      </span>
                      {comment.content}
                    </span>
                  ) : (
                    <span>{comment.content}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex relative cursor-pointer" onClick={onClickMoreHandler} ref={ref}>
              {more && (
                <div className="bg-white font-medium shadow-lg rounded-lg absolute w-32 h-auto right-1 bottom-4 z-50 border border-gray-200">
                  <div
                    className="border-b border-gray-300 px-3 py-1 text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-t-lg"
                    onClick={onAddComment}
                  >
                    대댓글 달기
                  </div>
                  {comment.commenter.nickname === myNickname ? (
                    <>
                      <div
                        className="border-b border-gray-300 px-3 py-1 text-center cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={onUpdateComment}
                      >
                        수정하기
                      </div>
                      <div
                        className="px-3 py-1 text-center cursor-pointer text-red-500 hover:bg-red-100 transition-all duration-200 rounded-b-lg"
                        onClick={onDeleteComment}
                      >
                        삭제하기
                      </div>
                    </>
                  ) : (
                    <div
                      className="px-3 py-1 text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-b-lg"
                      onClick={() => onClickPrivateChat(comment.commenter.token, comment.commenter.nickname)}
                    >
                      채팅 보내기
                    </div>
                  )}
                </div>
              )}

              <MdOutlineMoreHoriz size={25} />
            </div>

            <div className={`flex items-center gap-1 ${comment.parentId ? 'pl-1' : ''} justify-center`}>
              <span onClick={onClickLike} className="cursor-pointer">
                {comment.liked ? <FaHeart size={14} color="#ff4a4d" /> : <FaRegHeart size={14} />}{' '}
              </span>
              <span className="text-sm font-semibold w-2">{comment.commentLikes}</span>
            </div>
          </div>
        </div>
      )}

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
                inputRef={inputRef}
                refetchComment={refetchComment}
                getBestComment={getBestComment}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Comment;
