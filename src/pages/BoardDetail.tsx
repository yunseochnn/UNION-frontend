import { useState } from 'react';
import CommentList from '../components/BoardDetail/CommentList';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';
import More from '../components/BoardDetail/More';

export default function BoardDetail() {
  const [Modal, setModal] = useState(false);
  return (
    <div className="h-full w-full flex flex-col py-3 px-[30px] relative">
      {Modal && <More setModal={setModal} />}
      <Header setModal={setModal} />

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative">
        <Content />
        <CommentList />
      </div>

      <Footer />
    </div>
  );
}
