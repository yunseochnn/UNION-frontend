import Comment from './Comment';
import EmptyComment from './EmptyComment';

const CommentList = () => {
  return (
    <div className="min-h-80 border-t border-gray-300">
      <div className="mt-3">
        {/* 댓글 일떄 */}
        <div>
          <Comment />
        </div>

        {/* 대댓글 일때 */}
        <div className="ml-12">
          <Comment />
        </div>
      </div>

      {/* 댓글이 없을 경우 */}
      {/* <div className="h-full  flex items-center justify-center"><EmptyComment /></div> */}
    </div>
  );
};

export default CommentList;
