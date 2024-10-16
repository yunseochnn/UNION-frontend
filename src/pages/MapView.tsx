import Content from '../components/MapView/Content';
import Header from '../components/MapView/Header';

export default function MapView() {
  return (
    <div className="flex flex-col w-full h-full py-3">
      <Header />
      <Content />
    </div>
  );
}
