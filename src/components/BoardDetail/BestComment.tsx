import { useNavigate } from 'react-router-dom';
import { IFComment } from '../../pages/BoardDetail';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import dayjs from 'dayjs';

interface Prop {
  comment: IFComment;
}

const BestComment = ({ comment }: Prop) => {
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();

  const onClickCommentProfile = () => {
    if (comment.commenter.profileImage) {
      localStorage.setItem('userToken', comment.commenter.token);
      navigate('/userinfo');
    }
  };

  return (
    <div className={`px-2 mt-2 h-auto flex justify-between items-center`}>
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
          <div className="flex flex-col w-[90%] justify-start">
            <div style={{ lineHeight: 0.8 }}>
              <div className="flex gap-1 items-center h-auto">
                <div className="font-bold text-base">{comment.commenter.nickname}</div>
                <div className="text-customGray2 font-semibold text-xs">{comment.commenter.univName}</div>
                <div
                  className="flex border rounded-full font-bold flex-shrink-0 ml-1 text-center"
                  style={{
                    color: '#ff4a4d',
                    border: '2px solid #ff4a4d',
                    fontSize: '10px',
                    padding: '4px 6px',
                  }}
                >
                  <span className="w-auto h-auto">BEST</span>
                </div>
              </div>

              <div className="text-[10px] text-customGray2 font-medium">{`${dayjs(comment.createdAt).format(
                'MM/DD H:mm',
              )}`}</div>
            </div>

            <div className="text-sm font-semibold flex mt-1">
              {comment.parentNickname && comment.parentNickname !== comment.commenter.nickname ? (
                <span className="">
                  <span className="font-bold" style={{ color: '#ff4a4d' }}>
                    @{comment.parentNickname}
                  </span>
                  {comment.content}
                </span>
              ) : (
                <span className="">{comment.content}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className={`flex items-center gap-1 ${comment.parentId ? 'pl-1' : ''}`}>
          <span>{comment.liked ? <FaHeart size={14} color="#ff4a4d" /> : <FaRegHeart size={14} />} </span>
          <span className="text-sm font-semibold">{comment.commentLikes}</span>
        </div>
      </div>
    </div>
  );
};

export default BestComment;
