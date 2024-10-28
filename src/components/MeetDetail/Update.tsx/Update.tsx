import Header from './Header';
import Content from './Content';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBoardRequest from '../../../api/UpdateBoardRequest';
import axios from 'axios';

interface Prop {
  updateData: {
    title: string;
    content: string;
  };
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Update = ({ updateData, setModify }: Prop) => {
  const [title, setTitle] = useState(updateData.title);
  const [content, setContent] = useState(updateData.content);
  const [success, setSuccess] = useState(true);
  const [click, setClick] = useState(false);
  const { type, id } = useParams();
  const Type = type?.toUpperCase() || '';
  const BoardId = Number(id);

  const onUpdateBoard = useCallback(async () => {
    try {
      const response = await UpdateBoardRequest(title, content, Type, BoardId);
      if (!response) {
        console.log('네트워크 오류입니다.');
      }

      console.log(response);

      const { status } = response;
      if (status === 200) {
        console.log('수정 완료');
        setModify(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }, [BoardId, Type, content, setModify, title]);

  useEffect(() => {
    if (content !== '' && title !== '') {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [content, title]);

  useEffect(() => {
    if (click) {
      onUpdateBoard();
    }
  }, [click, onUpdateBoard]);
  return (
    <div className="absolute z-30 bg-white inset-0 px-[30px] flex flex-col">
      <Header success={success} setModify={setModify} setClick={setClick} />
      <Content title={title} content={content} setTitle={setTitle} setContent={setContent} />
      {/* <Footer /> */}
    </div>
  );
};

export default Update;
