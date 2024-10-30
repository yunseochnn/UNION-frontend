import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { format } from 'date-fns';

interface Prop {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Calendar = ({ selectedDate, setSelectedDate }: Prop) => {
  // 날짜 형식 변환
  const isoDate = selectedDate?.toISOString();
  console.log(isoDate);
  const formattedDate = isoDate ? format(isoDate, 'yyyy년 MM월 dd일 a hh:mm', { locale: ko }) : '';
  console.log(formattedDate);

  console.log(selectedDate);

  const now = new Date();
  const add30Minutes = new Date(now.getTime() + 30 * 60000); //현재 시간 + 30분

  // 커스텀 input 컴포넌트
  const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <input
      value={value || '날짜 선택'}
      onClick={onClick} // DatePicker의 onClick을 그대로 전달하여 선택 창을 열리게 함
      readOnly // 모바일 키보드 방지
      className="outline-none w-40 font-semibold"
    />
  );

  return (
    <DatePicker
      locale={ko}
      dateFormat="MM월 dd일 aa hh:mm"
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      showTimeSelect
      minDate={now}
      minTime={
        selectedDate && selectedDate.toDateString() === now.toDateString() ? add30Minutes : new Date(0, 0, 0, 0, 0)
      }
      maxTime={new Date(0, 0, 0, 23, 59)}
      customInput={<CustomInput value={formattedDate} />}
    />
  );
};

export default Calendar;
