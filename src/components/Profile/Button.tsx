interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md"
    >
      {label}
    </button>
  );
}
