import Footer from '../components/ChatList/Footer';
import Header from '../components/ChatList/Header';
import List from '../components/ChatList/List';

export default function ChatList() {
  return (
    <div className="h-full w-full flex flex-col px-[30px] py-[20px]">
      <Header />
      <List />
      <Footer />
    </div>
  );
}
