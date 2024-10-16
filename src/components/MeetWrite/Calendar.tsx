import { ko } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  console.log(selectedDate);
  return (
    <DatePicker
      showIcon
      locale={ko}
      dateFormat="MM월 dd일 aa hh:mm"
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      showTimeSelect
      className="outline-none w-48"
    />
  );
};

export default Calendar;
