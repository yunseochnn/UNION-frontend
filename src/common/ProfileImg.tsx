import { useState, useCallback, useEffect } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { FaCamera } from 'react-icons/fa6';
import getCroppedImg from './cropImage';

interface ProfileImgProps {
  profileImage: string;
  onImageChange: (image: string) => void;
}

export default function ProfileImg({ profileImage: initialProfileImage, onImageChange }: ProfileImgProps) {
  const [profileImage, setProfileImage] = useState<string | undefined>(initialProfileImage);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    setProfileImage(initialProfileImage);
  }, [initialProfileImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
    fileInput.click();
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropComplete = async () => {
    setIsCropping(false);
    if (croppedAreaPixels && profileImage) {
      const croppedImg = await getCroppedImg(profileImage, croppedAreaPixels);
      setCroppedImage(croppedImg);
      onImageChange(croppedImg);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isCropping ? (
        <div className="relative w-[200px] h-[200px]">
          <Cropper
            image={profileImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button
            onClick={handleCropComplete}
            className="absolute bottom-0 right-0 px-2 py-1 bg-white bg-opacity-30 backdrop-blur-md text-white rounded-lg shadow-lg border border-white"
          >
            크롭 완료
          </button>
        </div>
      ) : (
        <div className="relative mt-[37px] w-[98px] h-[98px]">
          <button
            className="w-full h-full bg-[#D9D9D9] rounded-full flex items-center justify-center relative"
            onClick={handleButtonClick}
          >
            {croppedImage ? (
              <img src={croppedImage} alt="Cropped Profile" className="w-full h-full object-cover rounded-full" />
            ) : profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : null}
          </button>

          <div className="absolute bottom-[2px] right-[-2px] w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center border border-gray-300">
            <FaCamera onClick={handleButtonClick} className="text-[#697077] text-[12px] cursor-pointer" />
          </div>
        </div>
      )}

      <input type="file" id="profile-image-input" accept="image/*" onChange={handleImageChange} className="hidden" />
    </div>
  );
}
