import { IFComment, UpComment } from '../../pages/BoardDetail';
import Comment from './Comment';
import EmptyComment from './EmptyComment';

interface Props {
  comments: IFComment[] | undefined;
  parentId: number | null;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParentId: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteComment: (commentId: number) => void;
}

const CommentList = ({ comments, parentId, setUpdateComment, setParentId, handleDeleteComment }: Props) => {
  return (
    <div className="min-h-80 border-t border-gray-300 pt-3">
      {comments ? (
        comments?.map(comment => (
          <div className={`${parentId ? 'ml-12' : ''}`}>
            <Comment
              comment={comment}
              setUpdateComment={setUpdateComment}
              setParentId={setParentId}
              handleDeleteComment={handleDeleteComment}
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
