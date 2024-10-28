import Policy from '../../../common/Policy';
import '../../../style.css';

interface Prop {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Content = ({ title, setTitle, content, setContent }: Prop) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4">
      <div>
        <Policy />
      </div>

      <div className="mt-4">
        <input value={title} className="outline-none w-full text-xl font-semibold" onChange={onChangeTitle} />
      </div>

      <textarea
        value={content}
        className="mt-4 w-full flex-1 text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar min-h-52"
        onChange={onChangeContent}
      />

      {/* <ShowImages images={images} setImages={setImages} /> */}
    </div>
  );
};

export default Content;
