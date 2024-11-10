import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { IFComment, ParentInfo, UpComment } from '../../pages/BoardDetail';
import Comment from './Comment';
import EmptyComment from './EmptyComment';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import BestComment from './BestComment';
import DeleteComment from './DeleteComment';

interface Props {
  comments: IFComment[] | undefined;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParent: React.Dispatch<React.SetStateAction<ParentInfo>>;
  handleDeleteComment: (commentId: number) => void;
  parent: ParentInfo;
  footerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  refetchComment: () => void;
}

const CommentList = ({
  comments,
  setUpdateComment,
  setParent,
  handleDeleteComment,
  parent,
  footerRef,
  inputRef,
  refetchComment,
}: Props) => {
  const { id } = useParams();
  const BoardId = Number(id);
  const [bestComment, setBestComment] = useState<IFComment | null>(null);

  const getBestComment = useCallback(async () => {
    try {
      const response = await apiClient.get(`/comment/best/${BoardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      if (response.data === '') {
        setBestComment(null);
      } else {
        setBestComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [BoardId]);

  useEffect(() => {
    getBestComment();
  }, [getBestComment]);
  return (
    <div className="min-h-80 w-[90%]">
      {bestComment &&
        (!bestComment.deleted ? <BestComment comment={bestComment} /> : <DeleteComment comment={bestComment} />)}
      {comments?.length !== 0 ? (
        comments?.map((comment, index) => (
          <div key={index}>
            <Comment
              comment={comment}
              setUpdateComment={setUpdateComment}
              setParent={setParent}
              handleDeleteComment={handleDeleteComment}
              parent={parent}
              footerRef={footerRef}
              inputRef={inputRef}
              refetchComment={refetchComment}
              getBestComment={getBestComment}
            />
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <EmptyComment />
        </div>
      )}
    </div>
  );
};

export default CommentList;
