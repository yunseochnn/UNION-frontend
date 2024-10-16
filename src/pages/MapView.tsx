import Content from '../components/MapView/Content';
import Header from '../components/MapView/Header';

export default function MapView() {
  return (
    <div className="flex flex-col w-screen h-screen py-3">
      <Header />
      <Content />
    </div>
  );
}
