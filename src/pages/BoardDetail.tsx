import { useEffect, useRef, useState } from 'react';
import CommentList from '../components/BoardDetail/CommentList';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';
import UserBlock from '../common/UserBlock';
import UserMore from '../common/UserMore';
import Update from '../components/BoardDetail/Update.tsx/Update';
import { useParams } from 'react-router-dom';
import RemoveBoard from '../components/BoardDetail/RemoveBoard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import Cookies from 'js-cookie';
import More from '../components/BoardDetail/More';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';

export interface IFComment {
  id: number;
  content: string;
  postId: number;
  parentId: number | null;
  parentNickname: string | null;
  createdAt: string;
  commentLikes: number;
  commenter: {
    token: string;
    nickname: string;
    profileImage: string | null;
    univName: string;
  };
  children?: IFComment[];
  liked: boolean;
}

export interface CommentData {
  comments: IFComment[];
  commentCount: number;
}

export interface BoardInfo {
  id: number;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  views: number;
  author: {
    token: string;
    nickname: string;
    profileImage: string;
    univName: string;
  };

  photos: string[];
}

export interface UpComment {
  content: string;
  commentId: number;
}

interface Like {
  postLikes: number;
  liked: boolean;
}

export interface ParentInfo {
  id: number | null;
  nickname: string | null;
}

export default function BoardDetail() {
  const [Modal, setModal] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const [parent, setParent] = useState<ParentInfo>({ id: null, nickname: null });
  const [updateComment, setUpdateComment] = useState<UpComment | null>(null);
  const { type, id } = useParams();
  const Type = type?.toUpperCase() || '';
  const BoardId = Number(id);
  const queryClient = useQueryClient();
  const commentListRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const name = localStorage.getItem('nickname') || '';
  const [myNickname, setMyNickname] = useState(name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //유저 상세정보
  const getUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/my', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });
      console.log(response.data);
      const data = response.data;
      localStorage.setItem('nickname', data.nickname);
      setMyNickname(data.nickname);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (myNickname === '') {
      getUserInfo();
    }
  }, [myNickname]);

  //게시물 상세 데이터 가져오기
  const {
    data: boardInfo,
    isError: isBoardError,
    error: boardError,
  } = useQuery<BoardInfo>({
    queryKey: ['boardDetail', BoardId],
    queryFn: async () => {
      const response = await apiClient.get<BoardInfo>(`/board/${Type}/${BoardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      return response.data;
    },
    retry: false,
  });

  console.log(boardInfo);

  //댓글 목록 read
  const {
    data: commentData,
    isError: isCommentError,
    error: commentError,
    refetch: refetchComment,
  } = useQuery<CommentData>({
    queryKey: ['commentDetail', BoardId],
    queryFn: async () => {
      const response = await apiClient.get(`/comments/${BoardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      console.log(response.data);
      console.log('댓글불러오기 성공');
      return response.data;
    },
    retry: false,
  });

  console.log(commentData);

  //게시글 좋아요 데이터 읽기
  const {
    data: Like,
    isError: isLikeError,
    error: LikeError,
    refetch: refetchLike,
  } = useQuery<Like>({
    queryKey: ['like', BoardId],
    queryFn: async () => {
      const response = await apiClient.get(`/board/likes/${BoardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      console.log(response.data);
      return response.data;
    },
    retry: false,
  });

  // 댓글 또는 대댓글 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: (newComment: string) =>
      apiClient.post(
        `/comment`,
        { postId: BoardId, content: newComment, parentId: parent.id, parentNickname: parent.nickname },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      ),
    onSuccess: () => {
      console.log('댓글 추가 완료');
      setParent({ id: null, nickname: null });
      queryClient.invalidateQueries({
        queryKey: ['commentDetail', BoardId],
      }); //리패칭하여 댓글 목록 최신화

      commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    onError: (error: Error) => {
      console.log(`comment Error: ${error}`);
    },
    retry: false,
  });

  //댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ content, commentId }: { content: string; commentId: number }) =>
      apiClient.put(
        `/comment/${commentId}`,
        {
          content: content,
          postId: BoardId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentDetail', BoardId],
      });
      console.log('댓글 수정 완료');
      commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    onError: (error: Error) => {
      console.log(`comment Update Error: ${error}`);
    },
  });

  //댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      apiClient.delete(`/comment/${commentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentDetail', BoardId],
      });
      console.log('댓글 삭제 완료');
      commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    onError: (error: Error) => {
      console.log(`comment Delete Error: ${error}`);
    },
  });

  const handleAddComment = (newComment: string) => {
    addCommentMutation.mutate(newComment);
  };

  const handleUpdateComment = ({ content, commentId }: { content: string; commentId: number }) => {
    updateCommentMutation.mutate({ content, commentId });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const updateData = {
    title: boardInfo?.title || '',
    content: boardInfo?.content || '',
  };

  if (isBoardError) {
    console.log(`게시물 read 에러 : ${boardError}`);
  }
  if (isCommentError) {
    console.log(`댓글 read 에러 : ${commentError}`);
  }
  if (isLikeError) {
    console.log(`좋아요 read 에러 : ${LikeError.message}`);
  }

  const onClickLike = async () => {
    try {
      const response = await apiClient.post(
        `/board/like/${BoardId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      );

      console.log(response.data);
      refetchLike();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center relative">
      {Modal &&
        (boardInfo?.author.nickname === myNickname ? (
          <UserMore setModal={setModal} setModify={setModify} setRemove={setRemove} />
        ) : (
          <More
            setModal={setModal}
            setUserBlock={setUserBlock}
            author={{ token: boardInfo?.author.token || '', nickname: boardInfo?.author.nickname || '' }}
          />
        ))}

      {userBlock && <UserBlock setUserBlock={setUserBlock} token={boardInfo?.author.token || ''} />}
      {modify && (
        <Update
          updateData={updateData}
          setModify={setModify}
          onSuccessfulUpdate={() => queryClient.invalidateQueries({ queryKey: ['boardDetail', BoardId] })}
        />
      )}
      {remove && <RemoveBoard setRemove={setRemove} />}
      <div className="w-full">
        <Header setModal={setModal} />
      </div>

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative w-full items-center">
        <Content boardContent={boardInfo} />

        <div className="flex gap-3 w-[85%] border-b border-gray-300 pb-3 items-center mt-2">
          <div className="flex items-center gap-1 font-semibold cursor-pointer" onClick={onClickLike}>
            {Like?.liked ? <IoMdHeart size={20} color="#ff4a4d" /> : <IoIosHeartEmpty size={20} />}{' '}
            <span className="text-xs">{Like?.postLikes || 0}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <HiOutlineChatBubbleOvalLeft size={20} />
            <span className="text-xs">{commentData?.commentCount}</span>
          </div>
        </div>

        <CommentList
          comments={commentData?.comments}
          setUpdateComment={setUpdateComment}
          handleDeleteComment={handleDeleteComment}
          parent={parent}
          setParent={setParent}
          footerRef={footerRef}
          inputRef={inputRef}
          refetchComment={refetchComment}
        />
      </div>

      <div className="w-[90%] pb-1" ref={footerRef}>
        <Footer
          inputRef={inputRef}
          handleAddComment={handleAddComment}
          handleUpdateComment={handleUpdateComment}
          updateComment={updateComment}
          setUpdateComment={setUpdateComment}
        />
      </div>
    </div>
  );
}
