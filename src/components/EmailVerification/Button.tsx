import { useNavigate } from 'react-router-dom';

export default function Button() {
  const navigate = useNavigate();
  return (
    <button
      className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md"
      onClick={() => navigate('/Profile')}
    >
      다음
    </button>
  );
}
