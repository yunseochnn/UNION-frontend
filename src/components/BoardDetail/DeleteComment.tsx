import { IFComment } from '../../pages/BoardDetail';

interface Prop {
  comment: IFComment | null;
}
const DeleteComment = ({ comment }: Prop) => {
  return (
    <div className={`px-2 mt-2 h-14 flex justify-between items-center ${comment?.parentId !== null ? 'pl-12' : ''} `}>
      <div className="flex gap-3 w-full">
        <div className="flex mt-2">
          <div className={`h-12 w-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 `}></div>
        </div>

        <div className="flex items-center w-full">
          <div className="flex flex-col justify-start w-[90%]">
            <div style={{ lineHeight: 0.8 }}>
              <div className="flex gap-1 items-center">
                <div className="font-bold text-base text-customGray2">(삭제)</div>
              </div>

              <div className="text-[10px] text-customGray2 font-medium"></div>
            </div>

            <div className="text-sm font-semibold flex mt-1 text-customGray2">삭제된 댓글입니다.</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex relative cursor-pointer"></div>

        <div className={`flex items-center gap-1 ${comment?.parentId ? 'pl-1' : ''} justify-center`}></div>
      </div>
    </div>
  );
};

export default DeleteComment;
