import { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';

interface Meeting {
  id: number;
  title: string;
  date: Date;
  time: string;
}

export default function MyCalendar() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await apiClient.get('/gatherings/my/participated', {
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);

        const fetchedMeetings = response.data.map((meeting: any) => {
          const dateTime = new Date(meeting.gatheringDateTime);
          return {
            id: meeting.id,
            title: meeting.title,
            date: dateTime,
            time: `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
          };
        });

        setMeetings(fetchedMeetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  const handleDateChange: CalendarProps['onChange'] = value => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const hasMeeting = meetings.some(
        meeting =>
          meeting.date.getFullYear() === date.getFullYear() &&
          meeting.date.getMonth() === date.getMonth() &&
          meeting.date.getDate() === date.getDate(),
      );
      if (hasMeeting) {
        return <div className="meeting-dot" />;
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const calendarMonth = currentMonth.getMonth();
    const calendarYear = currentMonth.getFullYear();
    const today = new Date();

    if (view === 'month') {
      if (date.getFullYear() !== calendarYear || date.getMonth() !== calendarMonth) {
        return 'outside-month';
      }

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return 'today';
      }

      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return 'weekend';
      }
    }
    return '';
  };

  const selectedMeetings = meetings.filter(
    meeting =>
      selectedDate &&
      meeting.date.getFullYear() === selectedDate.getFullYear() &&
      meeting.date.getMonth() === selectedDate.getMonth() &&
      meeting.date.getDate() === selectedDate.getDate(),
  );

  return (
    <div className="w-full flex flex-col items-center mt-3">
      <div className="calendar-container">
        <Calendar
          className="custom-calendar"
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          formatDay={(_, date) => date.getDate().toString()}
          onActiveStartDateChange={handleActiveStartDateChange}
          locale="ko"
        />
      </div>

      {selectedMeetings.length > 0 && (
        <div className="mt-2 p-4 border-t w-full max-w-md">
          {selectedMeetings.map((meeting, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-customGray1">{meeting.title}</span>
              <span className="text-customGray2">{meeting.time}</span>
            </div>
          ))}
        </div>
      )}

      {selectedMeetings.length === 0 && (
        <div className="mt-2 p-4 border-t w-full max-w-md text-center mb-2">
          <span className="text-customGray2">선택한 날짜에 모임이 없습니다.</span>
        </div>
      )}
    </div>
  );
}
