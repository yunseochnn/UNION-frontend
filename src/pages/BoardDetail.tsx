import { useRef, useState } from 'react';
import CommentList from '../components/BoardDetail/CommentList';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';
// import More from '../components/BoardDetail/More';
import UserBlock from '../common/UserBlock';
import UserMore from '../common/UserMore';
import Update from '../components/BoardDetail/Update.tsx/Update';
import { useParams } from 'react-router-dom';
import RemoveBoard from '../components/BoardDetail/RemoveBoard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import Cookies from 'js-cookie';
import More from '../components/BoardDetail/More';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userAtoms';

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
  children: IFComment[];
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
}

export default function BoardDetail() {
  const [Modal, setModal] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const [like, setLike] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  const [updateComment, setUpdateComment] = useState<UpComment | null>(null);
  const { type, id } = useParams();
  const Type = type?.toUpperCase() || '';
  const BoardId = Number(id);
  const queryClient = useQueryClient();
  const commentListRef = useRef<HTMLDivElement>(null);
  const myNickname = useRecoilValue(userState).nickname;

  const onClickLikeHandler = () => {
    setLike(!like);
  };

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
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU0MSwiZXhwIjoxNzMyNDMxNTQxLCJzdWIiOiJ0b2tlbjEifQ.ObKaKc37PY7NcO6ZRjw44pSu8xlvr4Oq_TdY_ySQJB4',
        },
      });
      return response.data;
    },
    retry: false,
  });

  //댓글 목록 read
  const {
    data: commentData,
    isError: isCommentError,
    error: commentError,
  } = useQuery<IFComment[]>({
    queryKey: ['commentDetail', BoardId],
    queryFn: async () => {
      const response = await apiClient.get(`/comment/${BoardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU0MSwiZXhwIjoxNzMyNDMxNTQxLCJzdWIiOiJ0b2tlbjEifQ.ObKaKc37PY7NcO6ZRjw44pSu8xlvr4Oq_TdY_ySQJB4',
        },
      });
      return response.data.comments;
    },
    retry: false,
  });

  //게시글 좋아요 데이터 읽기
  const {
    data: Like,
    isError: isLikeError,
    error: LikeError,
  } = useQuery<Like>({
    queryKey: ['like', BoardId],
    queryFn: async () => {
      const response = await apiClient.get(`/${BoardId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bmlvbiIsImlhdCI6MTcyOTgzOTU0MSwiZXhwIjoxNzMyNDMxNTQxLCJzdWIiOiJ0b2tlbjEifQ.ObKaKc37PY7NcO6ZRjw44pSu8xlvr4Oq_TdY_ySQJB4',
        },
      });
      return response.data;
    },
  });

  // 댓글 또는 대댓글 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: (newComment: string) =>
      apiClient.post(
        `/comment`,
        { postId: BoardId, content: newComment, parentId: parentId },
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
      }); //리패칭하여 댓글 목록 최신화
      commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    onError: (error: Error) => {
      console.log(`comment Error: ${error}`);
    },
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
    console.log(`댓글 read 에러 : ${LikeError}`);
  }

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
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

      {userBlock && <UserBlock setUserBlock={setUserBlock} />}
      {modify && (
        <Update
          updateData={updateData}
          setModify={setModify}
          onSuccessfulUpdate={() => queryClient.invalidateQueries({ queryKey: ['boardDetail', BoardId] })}
        />
      )}
      {remove && <RemoveBoard setRemove={setRemove} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative w-[85%]">
        <Content boardContent={boardInfo} />
        <div className="flex gap-3 my-3">
          <div className="flex items-center gap-1 font-semibold cursor-pointer" onClick={onClickLikeHandler}>
            {like ? <FaHeart size={18} color="#ff4a4d" /> : <FaRegHeart size={18} />}{' '}
            <span className="text-xs">{Like?.postLikes || 0}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <HiOutlineChatBubbleOvalLeft size={20} />
            <span className="text-xs">{commentData?.length}</span>
          </div>
        </div>
        <CommentList
          comments={commentData}
          setUpdateComment={setUpdateComment}
          setParentId={setParentId}
          handleDeleteComment={handleDeleteComment}
        />
      </div>

      <div className="w-[90%]">
        <Footer
          handleAddComment={handleAddComment}
          handleUpdateComment={handleUpdateComment}
          parentId={parentId}
          updateComment={updateComment}
        />
      </div>
    </div>
  );
}
