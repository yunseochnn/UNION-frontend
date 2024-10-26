import { useState } from 'react';
import '../../style.css';
import List from './List';

const Lists = () => {
  const [filter, setFilter] = useState('individaul');

  return (
    <div className="flex flex-col mt-5">
      <div className="flex gap-3 font-semibold">
        <span
          className={`cursor-pointer ${filter === 'meet' ? 'text-gray-400' : 'text-black'}`}
          onClick={() => setFilter('individual')}
        >
          개인
        </span>
        <span
          className={`cursor-pointer ${filter === 'meet' ? 'text-black' : 'text-gray-400'}`}
          onClick={() => setFilter('meet')}
        >
          모임
        </span>
      </div>

      <div className="mt-3">
        <List filter={filter} />
        <List filter={filter} />
        <List filter={filter} />
        <List filter={filter} />
      </div>
    </div>
  );
};

export default Lists;
