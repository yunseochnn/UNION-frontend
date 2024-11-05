import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

interface Props {
  images: string[];
}

const Slide = ({ images }: Props) => {
  if (images.length <= 1) {
    return (
      <div className="w-full h-auto flex justify-center items-center">
        <img src={images[0]} alt="slide-0" />
      </div>
    );
  }
  return (
    <Swiper spaceBetween={0} slidesPerView={1} centeredSlides={true}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-auto flex justify-center items-center px-1">
            <img src={image} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
