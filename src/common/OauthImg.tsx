interface OauthImgProps {
  profileImage: string;
}

export default function OauthImg({ profileImage }: OauthImgProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[37px] w-[98px] h-[98px]">
        <div className="w-full h-full bg-[#D9D9D9] rounded-full flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
