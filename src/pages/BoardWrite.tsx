import { useCallback, useEffect, useState } from 'react';
import Content from '../components/BoardWrite/Content';
import Footer from '../components/BoardWrite/Footer';
import Header from '../components/BoardWrite/Header';
import Vote from '../components/BoardWrite/Vote';
import { useNavigate, useParams } from 'react-router-dom';
import CreateBoardRequest from '../api/CreateBoardRequest';
import axios from 'axios';
import SaveImageRequest from '../api/SaveImageRequest';

export default function BoardWrite() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>(['', '']);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [voteTitle, setVoteTitle] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [click, setClick] = useState(false);
  const { type } = useParams();
  const Type = type?.toUpperCase();
  const navigate = useNavigate();
  console.log(items);

  const onSaveImage = useCallback(
    async (id: number) => {
      try {
        const response = await SaveImageRequest(id, 'POST', images);
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

  const onCreateBoard = useCallback(async () => {
    try {
      const response = await CreateBoardRequest({
        info: {
          type: Type || '',
          title: title,
          content: content,
          thumbnail: images[0] || '',
        },
      });

      if (!response) {
        alert('네트워크 이상입니다!');
        return;
      }

      const { id } = response.data;

      if (images.length > 0) {
        await onSaveImage(id);
      }

      navigate(`/board/${type}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }, [Type, content, images, navigate, onSaveImage, title, type]);

  useEffect(() => {
    if (click) {
      onCreateBoard();
    }
  }, [click, onCreateBoard]);

  return (
    <div className="flex flex-col w-full h-full px-[30px] pt-3 relative">
      {open && (
        <Vote items={items} setItems={setItems} setOpen={setOpen} voteTitle={voteTitle} setVoteTitle={setVoteTitle} />
      )}
      <Header success={success} setClick={setClick} />
      <Content
        items={items}
        images={images}
        setImages={setImages}
        setSuccess={setSuccess}
        voteTitle={voteTitle}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
      <Footer setOpen={setOpen} setImages={setImages} />
    </div>
  );
}
