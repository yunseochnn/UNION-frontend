const List = () => {
  return (
    <div className="w-full h-16 flex items-center mt-6 gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-300"></div>

      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <div className="text-base font-bold">찐 감자</div>
          <div className="text-sm text-gray-400 font-semibold">오후 4:20</div>
        </div>
        <div className="text-sm text-gray-400 font-semibold">채팅 내용이 들어갑니다. 채팅 내용이에요. 대충...</div>
      </div>
    </div>
  );
};

export default List;
