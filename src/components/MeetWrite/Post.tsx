import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IAddress } from '../../pages/MeetWrite';

interface Prop {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
}

interface CustomMarker extends kakao.maps.Marker {
  content?: string;
  positionY?: number;
  positionX?: number;
  addressName?: string;
  infowindow?: kakao.maps.InfoWindow;
  roadAddressName?: string;
  phone?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const Post = ({ setOpen, setAddress }: Prop) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState<CustomMarker[]>([]);
  const [change, setChange] = useState('');

  useEffect(() => {
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
          center: new kakao.maps.LatLng(37.5192177879504, 127.022960816995),
          level: 3,
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
      });
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!map) return;

    const { kakao } = window;

    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.error('사용 못함');
      return;
    }

    const ps = new kakao.maps.services.Places();
    console.log(keyword);

    if (keyword !== '') {
      ps.keywordSearch(keyword, (data: any, status: any) => {
        console.log(data);
        if (status === kakao.maps.services.Status.OK) {
          //검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
          //LatLngBounds 객체에 좌표 추가
          const bounds = new kakao.maps.LatLngBounds();
          const newMarkers = [];
          for (let i = 0; i < data.length; i++) {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(data[i].y, data[i].x),
              title: data[i].place_name,
            });
            marker.content = data[i].place_name;
            marker.positionY = data[i].y;
            marker.positionX = data[i].x;
            marker.addressName = data[i].address_name;
            marker.roadAddressName = data[i].road_address_name;
            marker.phone = data[i].phone;
            newMarkers.push(marker);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(newMarkers);
          //검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
      });
    }
  }, [map, keyword]);

  useEffect(() => {
    const { kakao } = window;

    if (!map) return;
    //기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    //새 마커 생성
    markers.forEach((marker: CustomMarker) => {
      marker.setMap(map);
      const iwContent = `<div style="padding:5px; height: 80px; display: flex; flex-direction: column; justify-content: space-between;">${marker.content}<br><div><a href="https://map.kakao.com/link/map/${marker.content},${marker.positionY},${marker.positionX}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${marker.content},${marker.positionY},${marker.positionX}" style="color:blue" target="_blank">길찾기</a></div></div>`;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });
      marker.infowindow = infowindow;
    });
  }, [map, markers]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(change);
  };

  const onClick = (marker: CustomMarker) => {
    setAddress({
      name: marker.content,
      address: marker.roadAddressName,
      positionX: marker.positionX,
      positionY: marker.positionY,
    });
    setOpen(false);
  };

  console.log(map);
  console.log(markers);
  console.log(keyword);

  return (
    <div className="absolute inset-0 bg-white  z-20 flex flex-col pt-3">
      <div className="flex items-center w-full h-[60px] gap-32">
        <div className="cursor-pointer font-black ml-7" onClick={() => setOpen(false)}>
          <IoIosArrowBack size={32} />
        </div>
        <div className="font-semibold text-lg">{`장소 검색`}</div>
      </div>

      <div id="map" className="w-full h-[400px] mt-2 relative"></div>

      <div className="flex flex-col flex-1 items-center px-5">
        <div className="shadow-md w-full h-11 mt-5 rounded-sm flex items-center px-3">
          <div>
            <IoSearch size={25} />
          </div>
          <form className=" ml-4 flex-1" onSubmit={onSubmit}>
            <input
              className="w-full h-7 outline-none"
              placeholder="장소를 입력해주세요"
              value={change}
              onChange={onChange}
            />
            <button type="submit"></button>
          </form>
        </div>

        <div className="w-full h-[330px] px-[30px] overflow-y-auto mt-4 flex flex-col gap-2">
          {markers.map((marker, index) => {
            return (
              <div key={index} className="flex flex-col border-b border-gray-300" onClick={() => onClick(marker)}>
                <div className="font-semibold">{marker.content}</div>
                <div className="text-sm text-gray-400">{marker.roadAddressName}</div>
                <div className="text-xs mt-2" style={{ color: '#ff4a4d' }}>
                  {marker.phone}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
