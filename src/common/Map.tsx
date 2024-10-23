import { useEffect, useState } from 'react';

interface Prop {
  x?: number;
  y?: number;
  name?: string;
  addrress?: string;
}

const Map = ({ x, y, name }: Prop) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      // Kakao Maps API 로드 완료 후 지도 생성
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div

        // LatLng 객체는 Kakao Maps API가 로드된 후에만 생성 가능
        const options = {
          center: new window.kakao.maps.LatLng(y, x),
          level: 4, // 지도 확대 레벨
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        //마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(y, x);

        //마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const geocoder = new window.kakao.maps.services.Geocoder();

        //1. 좌표 -> 주소 변환 요청 (Reverse Geocoding)
        geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log(result[0]);
            const roadAddress = result[0].road_address?.address_name || '도로명 주소 없음';
            setAddress(roadAddress);
            console.log(result[0]);
          }
        });
      });
    } else {
      console.error('Kakao Maps API 로드 실패');
    }
  }, [x, y]);

  return (
    <>
      <div id="map" className="w-[368px] h-[130px]"></div>
      <div className="ml-5 mt-3">
        <div className="font-semibold text-sm">{name}</div>
        <div className="font-medium text-xs text-gray-400">{address}</div>
      </div>
    </>
  );
};

export default Map;
