interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white px-4 py-2 rounded-md text-[23px] font-semibold w-full h-[63px] p-2 ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-mainColor cursor-pointer'
      }`}
    >
      {label}
    </button>
  );
}
