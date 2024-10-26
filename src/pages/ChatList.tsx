import Footer from '../components/ChatList/Footer';
import Header from '../components/ChatList/Header';
import Lists from '../components/ChatList/Lists';
import '../style.css';

export default function ChatList() {
  return (
    <div className="h-full w-full flex flex-col items-center pt-4">
      <div className="w-[90%]">
        <Header />
      </div>

      <div className="w-[90%] flex-1 overflow-y-auto hidden-scrollbar">
        <Lists />
      </div>

      <div className="w-[90%]">
        <Footer />
      </div>
    </div>
  );
}
