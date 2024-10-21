import { IoIosCloseCircle } from 'react-icons/io';

interface Prop {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ShowImages = ({ images, setImages }: Prop) => {
  const onClickCloseImage = (id: number) => {
    const newImages = images.filter((image, index) => index !== id);
    setImages(newImages);
  };

  return (
    <div className="flex gap-3 mb-3 overflow-x-auto hidden-scrollbar flex-shrink-0">
      {images &&
        images.map((image, index) => (
          <div
            key={index}
            className="h-24 w-24 flex flex-shrink-0 justify-center items-center rounded-md overflow-hidden relative"
          >
            <div>
              <img src={image} className="object-full" />
              <div className="absolute top-1 right-1" onClick={() => onClickCloseImage(index)}>
                <IoIosCloseCircle />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowImages;
