import { useCallback, useEffect, useState } from 'react';
import EmptyMap from './EmptyMap';
import { List } from '../../pages/MapView';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';
import Pin from '/Pin.png';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Prop {
  latitude: number | null;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  longitude: number | null;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  setModalContent: React.Dispatch<React.SetStateAction<List | null>>;
}

const Content = ({ latitude, setLatitude, longitude, setLongitude, setModalContent }: Prop) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [MeetList, setMeetList] = useState<List[] | null>(null);
  console.log(MeetList);

  console.log(map);

  const getMeetList = useCallback(async () => {
    try {
      // const response = await apiClient.get(
      //   `/gatherings?sortType=DISTANCE&latitude=${latitude}&longitude=${longitude}&page=0&size=15`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: Cookies.get('Authorization'),
      //     },
      //   },
      // );

      const response = await apiClient.get('/gatherings', {
        params: {
          sortType: 'DISTANCE',
          latitude,
          longitude,
          page: 0,
          size: 15,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });

      console.log(response);
      setMeetList(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }, [latitude, longitude]);

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
  }, [setLatitude, setLongitude]);

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

      //고민 => 현재 위치 버튼으로 가져오기 vs 이동할때마다(너무 요청 보낼까봐...)
      // // 지도가 이동될 때마다 API 호출
      // kakao.maps.event.addListener(mapInstance, 'dragend', () => {
      //   const center = mapInstance.getCenter();
      //   getMeetList(center.getLat(), center.getLng());
      // });

      setMap(mapInstance);

      //초기 지도 로드시 모임 데이터 가져오기
      getMeetList();
    });
  }, [getMeetList, latitude, longitude]);

  //마커 추가
  useEffect(() => {
    if (!map || MeetList?.length === 0) return;

    const { kakao } = window;

    //기존 마커 초기화
    const markers: kakao.maps.Marker[] = [];

    MeetList?.forEach(meet => {
      const markerPosition = new kakao.maps.LatLng(meet.latitude, meet.longitude);

      const imageSize = new kakao.maps.Size(15, 20);
      const markerImage = new kakao.maps.MarkerImage(Pin, imageSize);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map);

      //마커 클릭 추가
      kakao.maps.event.addListener(marker, 'click', () => {
        setModalContent(meet);
      });

      markers.push(marker);
    });

    return () => {
      //이전 마커 제거
      markers.forEach(marker => marker.setMap(null));
    };
  }, [MeetList, map, setModalContent]);

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
