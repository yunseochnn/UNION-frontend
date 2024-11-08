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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [maxMember, setMaxMember] = useState<OptionType | null>({ value: 2, label: 2 });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const onSaveImage = useCallback(
    async (id: number) => {
      try {
        const response = await SaveImageRequest(id, 'GATHERING', images);
        if (!response) {
          alert('네트워크 이상입니다!');
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
    },
    [images],
  );

  function toCustomISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;
  }

  const address1 = address?.address?.split(' ');
  const eupMyeonDong = address1 && address1[2];

  const onCreateMeet = useCallback(async () => {
    try {
      const response = await CreateMeetRequest({
        info: {
          title: title,
          text: text,
          maxMember: maxMember?.value ?? 0,
          selectedDate: selectedDate ? toCustomISOString(selectedDate) : '',
          ...(address && {
            address: address.address,
            latitude: address.positionY,
            longitude: address.positionX,
            eupMyeonDong: eupMyeonDong,
          }),
        },
      });

      if (!response) {
        alert('네트워크 이상입니다!');
        return;
      }
      const id = response.data;

      if (images.length > 0) {
        await onSaveImage(id);
      }

      navigate(`/meet/${id}?from=write`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }, [address, eupMyeonDong, images.length, maxMember?.value, navigate, onSaveImage, selectedDate, text, title]);

  useEffect(() => {
    if (click) {
      onCreateMeet();
    }
  }, [click, onCreateMeet]);

  return (
    <div className="w-full h-full overflow-hidden hidden-scrollbar flex flex-col pt-1 relative items-center">
      {open && <Post setOpen={setOpen} setAddress={setAddress} />}
      <div className="w-full px-5">
        {' '}
        <Header success={success} setClick={setClick} />
      </div>

      <Content
        address={address}
        setAddress={setAddress}
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
