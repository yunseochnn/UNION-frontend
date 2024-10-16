const Policy = () => {
  return (
    <div
      className="w-full h-[63px] rounded-md flex items-center justify-center text-sm px-5"
      style={{ backgroundColor: '#FEF5E6', color: '#4E3A23' }}
    >
      <div>
        <span className="font-semibold">안내</span>
        {` 이용약관을 위반하는 내용이 적발될 경우 이용
    이 정지될 수 있습니다. `}
        <span className="font-semibold underline">운영정책</span>
      </div>
    </div>
  );
};

export default Policy;
