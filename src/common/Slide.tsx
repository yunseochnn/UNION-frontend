import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

interface Props {
  images: string[];
}

const Slide = ({ images }: Props) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-auto">
            <img src={image} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
