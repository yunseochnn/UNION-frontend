import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { userState } from '../../recoil/userAtoms';

export default function WithdrawBtn() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    try {
      await apiClient.delete('/user');

      setUser({
        oauthUserToken: '',
        univName: '',
        nickname: '',
        description: '',
        profileImage: '',
      });
      alert('탈퇴가 완료되었습니다.');
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
      alert('탈퇴에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <button className="font-semibold text-[16px] text-mainColor mt-[22px]" onClick={handleWithdraw}>
        탈퇴하기
      </button>
    </div>
  );
}
