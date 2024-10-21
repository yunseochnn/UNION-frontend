export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/public/LogoImage.svg" alt="LogoImage" className="w-72 h-48 mt-4"></img>
      <img src="/public/Logo.svg" alt="LogoText" className="w-52 h-24 mt-10"></img>
    </div>
  );
}
