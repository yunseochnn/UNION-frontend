import axios from 'axios';
import RemoveBoardRequest from '../../api/RemoveBoardRequest';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface Prop {
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveBoard = ({ setRemove }: Prop) => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const Type = type?.toUpperCase() || '';
  const BoardId = Number(id);
  const navigate = useNavigate();

  const onClickYes = async () => {
    try {
      const response = await RemoveBoardRequest(Type, BoardId);

      const { status } = response;
      if (status === 204) {
        if (from === 'write') {
          navigate(`/board/${type}`);
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };
  const onClickNo = () => {
    setRemove(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="w-72 h-36 bg-white rounded-md flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-lg">해당 게시물을 삭제하시겠습니까?</div>
        <div className="flex gap-8">
          <div
            className="w-14 h-7 text-white rounded-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#ff4a4d' }}
            onClick={onClickYes}
          >
            네
          </div>
          <div
            className="w-14 h-7 text-white rounded-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#ff4a4d' }}
            onClick={onClickNo}
          >
            아니오
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBoard;
