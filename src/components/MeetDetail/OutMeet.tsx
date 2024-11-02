import axios from 'axios';
import OutMeetRequest from '../../api/OutMeetRequest';
import { useParams } from 'react-router-dom';

interface Props {
  setOutMeet: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutMeet = ({ setOutMeet }: Props) => {
  const { id } = useParams();
  const MeetId = Number(id);

  const onClickYes = async () => {
    try {
      const response = await OutMeetRequest(MeetId);

      if (!response) {
        alert('네트워크 오류입니다.');
        return;
      }

      console.log(response);
      const { status } = response;
      if (status === 200) {
        console.log('모임 나가기 성공');
        setOutMeet(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    }
  };
  const onClickNo = () => {
    setOutMeet(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="w-72 h-36 bg-white rounded-md flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-lg flex flex-col justify-center items-center">
          <span>해당 모임을 나가시겠습니까?</span>
          <span className="text-sm text-red-500">모임을 나가시면 모임 채팅도 나가게 됩니다</span>
        </div>
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

export default OutMeet;
