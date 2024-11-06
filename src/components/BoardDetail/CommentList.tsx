import { IFComment, ParentInfo, UpComment } from '../../pages/BoardDetail';
import Comment from './Comment';
import EmptyComment from './EmptyComment';

interface Props {
  comments: IFComment[] | undefined;
  setUpdateComment: React.Dispatch<React.SetStateAction<UpComment | null>>;
  setParent: React.Dispatch<React.SetStateAction<ParentInfo>>;
  handleDeleteComment: (commentId: number) => void;
  parent: ParentInfo;
  footerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const CommentList = ({
  comments,
  setUpdateComment,
  setParent,
  handleDeleteComment,
  parent,
  footerRef,
  inputRef,
}: Props) => {
  return (
    <div className="min-h-80 w-[90%]">
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
