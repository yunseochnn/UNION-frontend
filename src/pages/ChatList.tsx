import Footer from '../components/ChatList/Footer';
import Header from '../components/ChatList/Header';
import Lists from '../components/ChatList/Lists';

export default function ChatList() {
  return (
    <div className="h-full w-full flex flex-col px-[33px] py-3">
      <Header />
      <Lists />
      <Footer />
    </div>
  );
}
