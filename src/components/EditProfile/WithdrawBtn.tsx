import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { userState } from '../../recoil/userAtoms';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import WithdrawConfirmModal from './WithdrawConfirmModal';

export default function WithdrawBtn() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleWithdraw = async () => {
    try {
      await apiClient.delete('/user', {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      setUser({
        oauthUserToken: '',
        token: '',
        univName: '',
        nickname: '',
        description: '',
        profileImage: '',
      });

      Cookies.remove('Authorization', { path: '/' });
      Cookies.remove('Refresh-Token', { path: '/' });
      localStorage.removeItem('nickname');

      toast.success('탈퇴가 완료되었습니다.');
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
      toast.error('탈퇴에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <button className="font-semibold text-[16px] text-mainColor mt-[22px]" onClick={() => setShowModal(true)}>
        탈퇴하기
      </button>

      {showModal && (
        <WithdrawConfirmModal
          onConfirm={() => {
            setShowModal(false);
            handleWithdraw();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
