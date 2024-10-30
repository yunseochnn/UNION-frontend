import { useEffect, useState } from 'react';
import EmptyMap from './EmptyMap';

declare global {
  interface Window {
    kakao: any;
  }
}

const Content = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  console.log(map);

  //Geolocation을 직접 가져오는 함수
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error('위치 접근 거부', error);
        },
      );
    } else {
      console.error('Geolocation을 사용할 수 없습니다.');
    }
  }, []);

  //지도 불러오기
  useEffect(() => {
    if (!latitude || !longitude) return;

    const { kakao } = window;
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };
      const mapInstance = new kakao.maps.Map(container, options);

      // 드래그 가능 여부를 명시적으로 설정(안해주면 모바일에서 지도뷰가 안움직임)
      mapInstance.setDraggable(true);

      setMap(mapInstance);
    });
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
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
