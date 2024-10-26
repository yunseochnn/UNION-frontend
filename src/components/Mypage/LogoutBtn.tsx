import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.post('/user/signout', null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
        },
      });

      // 로그아웃 성공 시 쿠키 삭제
      Cookies.remove('Authorization', { path: '/' });
      Cookies.remove('Refresh-Token', { path: '/' });

      alert('로그아웃 되었습니다.');
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex-1 text-[16px] font-semibold mt-[10px] mb-[20px]" onClick={handleLogout}>
      로그아웃
    </div>
  );
}
