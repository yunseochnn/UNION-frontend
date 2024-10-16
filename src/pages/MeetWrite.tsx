import Content from '../components/MeetWrite/Content';
import Footer from '../components/MeetWrite/Footer';
import Header from '../components/MeetWrite/Header';
import '../style.css';

export default function MeetWrite() {
  return (
    <div className="w-full h-full overflow-hidden hidden-scrollbar flex flex-col px-[30px] py-3">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
