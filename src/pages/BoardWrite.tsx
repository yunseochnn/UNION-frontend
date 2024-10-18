import { useState } from 'react';
import Content from '../components/BoardWrite/Content';
import Footer from '../components/BoardWrite/Footer';
import Header from '../components/BoardWrite/Header';
import Vote from '../components/BoardWrite/Vote';

export default function BoardWrite() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>(['', '']);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  console.log(items);
  return (
    <div className="flex flex-col w-full h-full px-[30px] pt-3 relative">
      {open && <Vote items={items} setItems={setItems} setOpen={setOpen} />}
      <Header success={success} />
      <Content items={items} images={images} setImages={setImages} />
      <Footer setOpen={setOpen} setImages={setImages} images={images} />
    </div>
  );
}
