import Content from '../components/MapView/Content';
import Header from '../components/MapView/Header';
import MeetModal from '../components/MapView/MeetModal';

export default function MapView() {
  return (
    <div className="flex flex-col w-full h-full py-3 relative">
      <Header />
      <Content />
      <MeetModal />
    </div>
  );
}
