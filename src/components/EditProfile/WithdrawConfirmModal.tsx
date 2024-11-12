interface WithdrawConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawConfirmModal: React.FC<WithdrawConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <p className="text-lg font-semibold mb-4">정말 탈퇴하시겠습니까?</p>
        <div className="flex gap-4 justify-center">
          <button className="px-4 py-2 bg-mainColor text-white rounded-md font-semibold" onClick={onConfirm}>
            탈퇴
          </button>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-md font-semibold" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawConfirmModal;
