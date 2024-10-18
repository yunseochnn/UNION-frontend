import { useEffect, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
import EmptyMap from './EmptyMap';

declare global {
  interface Window {
    kakao: any;
  }
}

const Content = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const geolocation = useGeolocation();

  //지도 불러오기
  useEffect(() => {
    if (!geolocation.latitude || !geolocation.longitude) return;

    const { kakao } = window;
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude),
        level: 5,
      };
      const mapInstance = new kakao.maps.Map(container, options);
      setMap(mapInstance);
    });
  }, [geolocation.latitude, geolocation.longitude]);

  if (!geolocation.latitude || !geolocation.longitude) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <EmptyMap />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div id="map" className="h-full"></div>
    </div>
  );
};

export default Content;
