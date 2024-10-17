import { useEffect, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';

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
    console.log(geolocation);

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude),
          level: 3,
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
      });
    };
    document.head.appendChild(script);
  }, [geolocation]);

  return (
    <div className="py-3 h-full w-full">
      <div id="map" className="h-full"></div>
    </div>
  );
};

export default Content;
