import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const Slide = () => {
  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      <SwiperSlide>
        <div className="w-[368px] h-[396px] bg-gray-300">1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[368px] h-[396px] bg-gray-300">2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-[368px] h-[396px] bg-gray-300">3</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slide;
