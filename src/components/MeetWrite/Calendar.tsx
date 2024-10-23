import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { format } from 'date-fns';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // 날짜 형식 변환
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일 hh:mm', { locale: ko }) : '';
  console.log(formattedDate);

  console.log(selectedDate);
  return (
    <DatePicker
      locale={ko}
      dateFormat="MM월 dd일 aa hh:mm"
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      showTimeSelect
      className="outline-none w-30 text-sm font-semibold"
    />
  );
};

export default Calendar;
