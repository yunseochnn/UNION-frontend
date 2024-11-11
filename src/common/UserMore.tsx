import { GrDocumentUpdate } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

interface Prop {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMore = ({ setModal, setModify, setRemove }: Prop) => {
  const pathname = useLocation().pathname;
  const name = pathname.includes('meet') ? '모임' : '게시글';

  const onUpdate = () => {
    setModal(false);
    setModify(true);
  };

  const onDelete = () => {
    setModal(false);
    setRemove(true);
  };

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-end">
      <div className="w-full bg-gray-200 rounded-tl-lg roun rounded-tr-lg p-5 gap-3 flex flex-col">
        <div className="bg-white h-auto rounded-lg px-3 flex flex-col font-semibold">
          <div className="flex border-b border-gray-200 items-center gap-2 h-14 cursor-pointer" onClick={onUpdate}>
            <span>
              <GrDocumentUpdate size={15} />
            </span>
            <span>{`${name} 수정하기`}</span>
          </div>
          <div className="flex  items-center gap-1 h-14 cursor-pointer" onClick={onDelete}>
            <span>
              <MdDeleteOutline size={20} />
            </span>
            <span>{`${name} 삭제하기`}</span>
          </div>
        </div>

        <div
          className="bg-white h-14 rounded-lg cursor-pointer flex items-center justify-center font-semibold"
          onClick={() => setModal(false)}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default UserMore;
