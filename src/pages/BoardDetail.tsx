import { useCallback, useEffect, useState } from 'react';
import CommentList from '../components/BoardDetail/CommentList';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';
// import More from '../components/BoardDetail/More';
import UserBlock from '../common/UserBlock';
import UserMore from '../common/UserMore';
import Update from '../components/BoardDetail/Update.tsx/Update';
import axios from 'axios';
import ReadBoardRequest from '../api/ReadBoardRequest';
import { useParams } from 'react-router-dom';
import RemoveBoard from '../components/BoardDetail/RemoveBoard';

export interface boardInfo {
  id: number;
  title: string;
  content: string;
  type: string;
  thumbnail: string | null;
  views: number;
  nickname: string;
  profileImage: string | null;
  univName: string;
  createdAt: string;
  updatedAt: string;
}

export default function BoardDetail() {
  const [Modal, setModal] = useState(false);
  const [userBlock, setUserBlock] = useState(false);
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  const { type, id } = useParams();
  const Type = type?.toUpperCase() || '';
  const BoardId = Number(id);
  const [boardContent, setBoardContent] = useState<boardInfo | null>(null);

  const updateData = {
    title: boardContent?.title || '',
    content: boardContent?.content || '',
  };

  const onReadBoard = useCallback(async () => {
    try {
      const response = await ReadBoardRequest(Type, BoardId);

      if (!response) {
        alert('네트워크 오류입니다.');
        return;
      }

      const data = response.data;
      setBoardContent(data);
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }, [BoardId, Type]);

  useEffect(() => {
    onReadBoard();
  }, [onReadBoard, modify]);

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal && <UserMore setModal={setModal} setModify={setModify} setRemove={setRemove} />}
      {userBlock && <UserBlock setUserBlock={setUserBlock} />}
      {modify && <Update updateData={updateData} setModify={setModify} />}
      {remove && <RemoveBoard setRemove={setRemove} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative w-[85%]">
        <Content boardContent={boardContent} />
        <CommentList />
      </div>

      <div className="w-[90%]">
        <Footer />
      </div>
    </div>
  );
}
