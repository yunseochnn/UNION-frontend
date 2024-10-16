import Content from '../components/BoardWrite/Content';
import Footer from '../components/BoardWrite/Footer';
import Header from '../components/BoardWrite/Header';

export default function BoardWrite() {
  return (
    <div className="flex flex-col w-full h-full px-[30px] py-3">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
