import { useCallback, useEffect, useState } from 'react';
import Content from '../components/MeetWrite/Content';
import Footer from '../components/MeetWrite/Footer';
import Header from '../components/MeetWrite/Header';
import '../style.css';
import Post from '../components/MeetWrite/Post';
import CreateMeetRequest from '../api/CreateMeetRequest';
import axios from 'axios';
import SaveImageRequest from '../api/SaveImageRequest';
import { useNavigate } from 'react-router-dom';

export interface IAddress {
  address?: string;
  positionX?: number;
  positionY?: number;
  name?: string;
}

export interface OptionType {
  value: number;
  label: number;
}

export default function MeetWrite() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<IAddress | null>(null);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [maxMember, setMaxMember] = useState<OptionType | null>({ value: 2, label: 2 });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  console.log(address);

  const onSaveImage = useCallback(
    async (id: number) => {
      try {
        const response = await SaveImageRequest(id, 'GATHERING', images);
        if (!response) {
          alert('네트워크 이상입니다!');
          return;
        }
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    },
    [images],
  );

  const onCreateMeet = useCallback(async () => {
    try {
      const response = await CreateMeetRequest({
        info: {
          title: title,
          text: text,
          maxMember: maxMember?.value ?? 0,
          selectedDate: selectedDate?.toISOString() || '',
          ...(address && {
            address: address.address,
            latitude: address.positionY,
            longitude: address.positionX,
          }),
        },
      });

      if (!response) {
        alert('네트워크 이상입니다!');
        return;
      }
      console.log(response);
      const { id } = response.data;

      if (images.length > 0) {
        await onSaveImage(id);
      }

      navigate(`/meet/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }, [address, images.length, maxMember?.value, navigate, onSaveImage, selectedDate, text, title]);

  useEffect(() => {
    if (click) {
      onCreateMeet();
    }
  }, [click, onCreateMeet]);

  return (
    <div className="w-full h-full overflow-hidden hidden-scrollbar flex flex-col pt-3 relative items-center">
      {open && <Post setOpen={setOpen} setAddress={setAddress} />}
      <Header success={success} setClick={setClick} />
      <Content
        address={address}
        setSuccess={setSuccess}
        images={images}
        setImages={setImages}
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maxMember={maxMember}
        setMaxMember={setMaxMember}
      />
      <Footer setOpen={setOpen} setImages={setImages} />
    </div>
  );
}
