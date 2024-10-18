import { FaRegCircle } from 'react-icons/fa6';
import { MdHowToVote } from 'react-icons/md';

interface Prop {
  items: string[];
}

const VoteContent = ({ items }: Prop) => {
  return (
    <div className="w-full h-auto border border-gray-300 rounded-md p-4 mb-2">
      <div>
        <div className="flex gap-1">
          <MdHowToVote />
          <span className="text-sm">투표</span>
        </div>
      </div>

      <div className="mt-1">
        {items.map((item, index) => (
          <div className="h-10 bg-gray-100 rounded-md mt-2 flex items-center pl-4" key={index}>
            <FaRegCircle size={10} color="lightgray" style={{ strokeWidth: 2 }} />
            <span className="ml-3">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteContent;
