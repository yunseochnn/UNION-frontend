import { useState } from 'react';
import CommentList from '../components/BoardDetail/CommentList';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';
import More from '../components/BoardDetail/More';
import UserBlock from '../common/UserBlock';

export default function BoardDetail() {
  const [Modal, setModal] = useState(false);
  const [userBlock, setUserBlock] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center pt-1 pb-2 relative">
      {Modal && <More setModal={setModal} setUserBlock={setUserBlock} />}
      {userBlock && <UserBlock setUserBlock={setUserBlock} />}
      <div className="w-[85%]">
        <Header setModal={setModal} />
      </div>

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative w-[85%]">
        <Content />
        <CommentList />
      </div>

      <div className="w-[90%]">
        <Footer />
      </div>
    </div>
  );
}
