import { LuSendHorizonal } from 'react-icons/lu';

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

const Footer = ({ input, setInput, sendMessage }: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <form className="h-14 flex items-center justify-between w-[90%]" onSubmit={onSubmit}>
      <div className="w-[90%]">
        <input
          className="bg-gray-100 w-full h-10 rounded-full py-2 px-4 outline-none"
          type="text"
          placeholder="메시지 보내기"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <button type="submit">
        {' '}
        <LuSendHorizonal size={20} />
      </button>
    </form>
  );
};

export default Footer;
