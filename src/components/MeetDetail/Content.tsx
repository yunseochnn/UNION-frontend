import { useEffect, useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import '../../style.css';

const Content = () => {
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false&libraries=services`;
    script.async = true;

    // 스크립트가 로드되면 Kakao Maps API를 초기화
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        // Kakao Maps API 로드 완료 후 지도 생성
        window.kakao.maps.load(() => {
          const container = document.getElementById('map'); // 지도를 표시할 div

          // LatLng 객체는 Kakao Maps API가 로드된 후에만 생성 가능
          const options = {
            center: new window.kakao.maps.LatLng(37.5361699, 126.8277859),
            level: 4, // 지도 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);

          //마커가 표시될 위치
          const markerPosition = new window.kakao.maps.LatLng(37.5361699, 126.8277859);

          //마커 생성
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          const geocoder = new window.kakao.maps.services.Geocoder();

          //1. 좌표 -> 주소 변환 요청 (Reverse Geocoding)
          geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const roadAddress = result[0].road_address?.address_name || '도로명 주소 없음';
              setAddress(roadAddress);
              setPlace(result[0]?.road_address?.building_name);
              console.log(result[0]);
            }
          });
        });
      } else {
        console.error('Kakao Maps API 로드 실패');
      }
    };

    script.onerror = () => {
      console.error('Kakao Maps script 로드에 실패했습니다.');
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">
      <div>
        <div
          className="rounded-full h-[30px] w-[74px] flex items-center justify-center gap-2 text-sm font-bold"
          style={{ backgroundColor: '#F2F3F6' }}
        >
          <span>
            <HiOutlineUserGroup size={16} style={{ strokeWidth: 2 }} />
          </span>
          <span>일정</span>
        </div>
      </div>

      <div className="flex items-center mt-[30px] gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="font-semibold text-sm">유니</div>
          <div className="font-semibold text-sm text-gray-400">방배본동 인증 30회 · 1일전</div>
        </div>
      </div>

      <div className="mt-5 text-[22px]">
        <span className="font-bold" style={{ color: '#FF4A4D' }}>
          모집중
        </span>
        <span className="font-bold">{` 8/28(수) 모각모`}</span>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <span>
          <FaRegCalendarCheck size={22} />
        </span>
        <span className="text-[18px] font-semibold">오늘, 오후 2:00</span>
      </div>

      <div className="mt-5 text-base">
        <div>
          {`사당역/이수역 인근 카페에서 같이 모델링해요~~
        f360,blender,zbrush, maya 등등 구성원분들 다양하게 툴 사용하며 각자 모델링하고 있습니다~`}
        </div>
      </div>

      <div className="mt-4">
        <div className="h-[396px] w-[368px] bg-gray-300"></div>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="h-48 w-[368px] border border-gray-200 rounded-md">
          <div id="map" className="w-[368px] h-[130px]"></div>
          <div className="ml-5 mt-3">
            <div className="font-semibold text-sm">{place}</div>
            <div className="font-medium text-xs text-gray-400">{address}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <div className="font-semibold text-gray-500 text-sm">관심 0 · 조회 29</div>
      </div>

      <div className="mt-5 border-t border-gray-150 pt-6 mb-2">
        <div className="font-bold text-xl">
          <span>{`참여 중인 이웃 `}</span>
          <span style={{ color: '#FF4A4D' }}>1</span>
          <span>/4</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
