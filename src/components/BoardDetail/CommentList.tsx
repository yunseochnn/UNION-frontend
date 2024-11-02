import { IFComment, ParentInfo, UpComment } from '../../pages/BoardDetail';
import Comment from './Comment';
import EmptyComment from './EmptyComment';

interface Props {
  comments: IFComment[] | undefined;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParent: React.Dispatch<React.SetStateAction<ParentInfo>>;
  handleDeleteComment: (commentId: number) => void;
  parent: ParentInfo;
}

const CommentList = ({ comments, setUpdateComment, setParent, handleDeleteComment, parent }: Props) => {
  return (
    <div className="min-h-80 border-t border-gray-300 pt-3">
      {comments ? (
        comments?.map((comment, index) => (
          <div key={index}>
            <Comment
              comment={comment}
              setUpdateComment={setUpdateComment}
              setParent={setParent}
              handleDeleteComment={handleDeleteComment}
              parent={parent}
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
