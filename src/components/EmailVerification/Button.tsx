interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

export default function Button({ onClick, disabled, label }: ButtonProps) {
  return (
    <button
      className={`text-[23px] font-semibold w-full h-[63px] text-white p-2 rounded-md ${disabled ? 'bg-customGray2' : 'bg-mainColor'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
