interface EditButtonProps {
  label: string;
  onClick: () => void;
}

export default function EditButton({ label, onClick }: EditButtonProps) {
  return (
    <div className="text-center mt-5">
      <button
        className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
