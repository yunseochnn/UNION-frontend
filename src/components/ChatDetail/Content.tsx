import Policy from '../../common/Policy';
import '../../style.css';

const Content = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-3">
      <div>
        <Policy />
      </div>

      <div className="mt-2 w-full">
        <div className="w-full flex justify-center">
          <div className="text-sm font-semibold text-gray-400">2024년 9월 2일</div>
        </div>
        {/* 상대방 - 개인에서*/}
        <div className="flex mt-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="w-[60%] h-auto text-xs bg-gray-200 rounded-xl flex items-center justify-center ml-3 p-3 font-semibold">
            채팅 내용이 들어갑니다. 채팅 내용이에요.뭘 적지..배고프다..감자탕 먹고싶어
          </div>
          <div className="flex items-end ml-2">
            <div className="text-xs text-gray-400">오후 4:00</div>
          </div>
        </div>

        {/* 내꺼 */}
        <div className="w-full flex justify-end mt-4">
          <div className="flex items-end mr-2">
            <div className="text-xs text-gray-400">오후 4:20</div>
          </div>

          <div
            className="w-[60%] h-auto text-xs  rounded-xl flex items-center justify-center p-3 text-white font-semibold"
            style={{ backgroundColor: '#ff4a4d' }}
          >
            채팅 내용이 들어갑니다. 채팅 내용이에요.
          </div>
        </div>

        {/* 입장 멘트 */}
        <div className="w-full mt-4 flex justify-center items-center">
          <div className="text-gray-400 rounded-full px-11 py-1 text-sm font-medium">대왕감자님이 입장하였습니다.</div>
        </div>

        {/* 상대방 - 모임에서 */}
        <div className="flex mt-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="w-[60%] ml-3 ">
            <div className="text-sm font-semibold">대왕감자</div>
            <div className=" h-auto text-xs bg-gray-200 rounded-xl flex items-center justify-center p-3 font-semibold">
              채팅 내용이 들어갑니다. 채팅 내용이에요.뭘 적지..배고프다..감자탕 먹고싶어
            </div>
          </div>
          <div className="flex items-end ml-2">
            <div className="text-xs text-gray-400">오후 4:00</div>
          </div>
        </div>

        {/* 퇴장 멘트 */}
        <div className="w-full mt-4 flex justify-center items-center">
          <div className="text-gray-400 rounded-full px-11 py-1 text-sm font-medium">대왕감자님이 퇴장하였습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default Content;
