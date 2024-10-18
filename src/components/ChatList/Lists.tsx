import { useState } from 'react';
import '../../style.css';
import List from './List';

const Lists = () => {
  const [filter, setFilter] = useState('개인');

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-5">
      <div className="flex gap-3 font-semibold">
        <span
          className={`cursor-pointer ${filter === '모임' ? 'text-gray-400' : 'text-black'}`}
          onClick={() => setFilter('개인')}
        >
          개인
        </span>
        <span
          className={`cursor-pointer ${filter === '모임' ? 'text-black' : 'text-gray-400'}`}
          onClick={() => setFilter('모임')}
        >
          모임
        </span>
      </div>

      <div>
        <List />
      </div>
    </div>
  );
};

export default Lists;
