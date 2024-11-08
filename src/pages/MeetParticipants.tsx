import Content from '../components/MeetParticipants/Content';
import Header from '../components/MeetParticipants/Header';

const MeetParticipants = () => {
  return (
    <div className="w-full h-full flex flex-col items-center pt-1">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex w-full">
        <Content />
      </div>
    </div>
  );
};

export default MeetParticipants;
