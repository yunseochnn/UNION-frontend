import { useState } from 'react';
import Content from '../components/MeetWrite/Content';
import Footer from '../components/MeetWrite/Footer';
import Header from '../components/MeetWrite/Header';
import '../style.css';
import Post from '../components/MeetWrite/Post';

export interface IAddress {
  address?: string;
  positionX?: number;
  positionY?: number;
  name?: string;
}

export default function MeetWrite() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<IAddress | null>(null);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  return (
    <div className="w-full h-full overflow-hidden hidden-scrollbar flex flex-col px-[30px] pt-3 relative">
      {open && <Post setOpen={setOpen} setAddress={setAddress} />}
      <Header success={success} />
      <Content address={address} setSuccess={setSuccess} images={images} setImages={setImages} />
      <Footer setOpen={setOpen} images={images} setImages={setImages} />
    </div>
  );
}
