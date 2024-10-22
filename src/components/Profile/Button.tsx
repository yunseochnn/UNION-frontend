import { useNavigate } from 'react-router-dom';

export default function Button() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md "
        onClick={() => navigate('/')}
      >
        다음
      </button>
    </div>
  );
}
