import Content from '../components/MeetDetail/Content';
import Footer from '../components/MeetDetail/Footer';
import Header from '../components/MeetDetail/Header';

export default function MeetDetail() {
  return (
    <div className="h-screen w-screen flex flex-col px-[30px] py-3">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
