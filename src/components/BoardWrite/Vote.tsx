import { useEffect, useState } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

interface Prop {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Vote = ({ items, setItems, setOpen }: Prop) => {
  const [success, setSuccess] = useState(false);
  const addItem = () => {
    setItems([...items, '']);
  };

  const removeItem = (id: number) => {
    const newItem = items.filter((item, index) => index !== id);
    setItems(newItem);
  };

  const onChage = (index: number, value: string) => {
    const updataItems = [...items];
    updataItems[index] = value;
    setItems(updataItems);
  };

  const onClickConfirm = () => {
    if (success) {
      const newItem = items.filter(item => item !== '');
      setItems(newItem);
      setOpen(false);
    }
  };

  const onClickBack = () => {
    const newItems = ['', ''];
    setItems(newItems);
    setSuccess(false);
    setOpen(false);
  };

  useEffect(() => {
    if (items[0] !== '' && items[1] !== '') {
      setSuccess(true);
    }
  }, [items, setSuccess]);

  return (
    //inset-0을 넣어줘야 위를 덮음
    <div className="absolute z-30 bg-white inset-0 px-[30px] flex flex-col">
      <div className="flex items-center justify-between w-full h-[60px] border-b border-gray-200 pt-3">
        <div className="cursor-pointer font-black" onClick={onClickBack}>
          <IoIosArrowBack size={32} />
        </div>
        <div className="font-semibold text-lg">{`투표 만들기`}</div>
        <div className="flex gap-[20px]">
          <div
            onClick={onClickConfirm}
            className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}
          >
            완료
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-6">
        {items.map((item, index) => (
          <div key={index}>
            {index < 2 ? (
              <div>
                <input
                  className=" w-full h-10 text-lg border-b border-gray-300 pb-2 outline-none"
                  placeholder="항목 입력"
                  value={item}
                  onChange={e => onChage(index, e.target.value)}
                />
              </div>
            ) : (
              <div className="flex justify-between">
                <input
                  className="w-[93%] h-10 text-lg border-b border-gray-300 pb-2 outline-none"
                  placeholder="항목 입력"
                  value={item}
                  onChange={e => onChage(index, e.target.value)}
                />
                <div onClick={() => removeItem(index)} className="cursor-pointer">
                  <FiMinusCircle color="gray" size={23} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full bg-gray-100 h-14 rounded-md mt-4 text-lg" onClick={addItem}>
        + 항목 추가
      </button>
    </div>
  );
};

export default Vote;
