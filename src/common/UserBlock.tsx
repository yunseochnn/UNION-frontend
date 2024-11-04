import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Cookies from 'js-cookie';

interface Prop {
  setUserBlock: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}

const UserBlock = ({ setUserBlock, token }: Prop) => {
  const navigate = useNavigate();
  const BlockUser = async () => {
    try {
      const response = await apiClient.post(
        `/user/block/${token}`,
        {},
        {
          headers: {
            Authorization: Cookies.get('Authorization'),
          },
        },
      );

      const { status } = response;
      if (status === 200) {
        console.log('유저차단 성공');
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClickYes = async () => {
    // 유저 차단 api 연동
    await BlockUser();
    setUserBlock(false);
  };
  const onClickNo = () => {
    setUserBlock(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="w-72 h-36 bg-white rounded-md flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-lg">해당 유저를 차단하시겠습니까?</div>
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

export default UserBlock;
