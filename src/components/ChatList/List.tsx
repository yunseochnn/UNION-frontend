import { useState } from 'react';
import '../../style.css';

const List = () => {
  const [isGroup, setIsGroup] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-5">
      <div className="flex gap-3 font-semibold">
        <span
          className={`cursor-pointer ${isGroup ? 'text-gray-400' : 'text-black'}`}
          onClick={() => setIsGroup(!isGroup)}
        >
          개인
        </span>
        <span
          className={`cursor-pointer ${isGroup ? 'text-black' : 'text-gray-400'}`}
          onClick={() => setIsGroup(!isGroup)}
        >
          모임
        </span>
      </div>
    </div>
  );
};

export default List;
