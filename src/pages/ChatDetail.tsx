import Content from '../components/ChatDetail/Content';
import Footer from '../components/ChatDetail/Footer';
import Header from '../components/ChatDetail/Header';

export default function ChatDetail() {
  return (
    <div className="flex flex-col w-screen h-screen px-[30px] py-3">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
