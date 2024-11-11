import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.post('/user/signout', null, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      // 로그아웃 성공 시 쿠키 삭제
      Cookies.remove('Authorization', { path: '/' });
      Cookies.remove('Refresh-Token', { path: '/' });
      localStorage.removeItem('nickname');

      toast.success('로그아웃 되었습니다.');
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      toast.error('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <button
        className="flex-1 text-[16px] font-semibold mt-[10px] mb-[20px] bg-transparent border-none p-0 cursor-pointer text-left"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
