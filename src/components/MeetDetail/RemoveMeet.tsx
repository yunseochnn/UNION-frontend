import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RemoveMeetRequest from '../../api/RemoveMeetRequest';

interface Prop {
  setRemove: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveMeet = ({ setRemove }: Prop) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const BoardId = Number(id);
  const navigate = useNavigate();

  const onClickYes = async () => {
    try {
      const response = await RemoveMeetRequest(BoardId);

      if (!response) {
        alert('네트워크 이상입니다.');
        return;
      }

      const { status } = response;
      if (status === 204) {
        if (from === 'write') {
          navigate('/meet');
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
        <div className="font-semibold text-lg">해당 모임을 삭제하시겠습니까?</div>
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

export default RemoveMeet;
