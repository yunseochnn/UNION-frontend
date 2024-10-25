import PlusImage from '../../../common/PlusImage';

interface Prop {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer = ({ setImages }: Prop) => {
  return (
    <div className="border-t border-gray-200 h-14">
      <div className="flex gap-7 mt-4 text-gray-400">
        <PlusImage setImages={setImages} />
      </div>
    </div>
  );
};

export default Footer;
