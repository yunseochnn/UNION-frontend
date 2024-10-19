import Content from '../components/MeetParticipants/Content';
import Header from '../components/MeetParticipants/Header';

const MeetParticipants = () => {
  return (
    <div className="w-full h-full flex flex-col px-[30px] py-3">
      <Header />
      <Content />
    </div>
  );
};

export default MeetParticipants;
