import './App.css';
import { RecoilRoot } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SocialLogin from './pages/SocialLogin';
import EmailVerification from './pages/EmailVerification';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Mypage from './pages/Mypage';
import EditProfile from './pages/EditProfile';
import Meet from './pages/Meet';
import MeetDetail from './pages/MeetDetail';
import MeetWrite from './pages/MeetWrite';
import ChatList from './pages/ChatList';
import ChatDetail from './pages/ChatDetail';
import MapView from './pages/MapView';
import Notification from './pages/Notification';
import Board from './pages/Board';
import BoardList from './pages/Board/type';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';
import MeetParticipants from './pages/MeetParticipants';
import UserInfo from './pages/UserInfo';
import BlockedUser from './pages/BlockedUser';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SocialLogin" element={<SocialLogin />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Search:type" element={<Search />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Meet" element={<Meet />} />
        <Route path="/Meet/:id" element={<MeetDetail />} />
        <Route path="/Meet/Write" element={<MeetWrite />} />
        <Route path="/Meet/Participants/:id" element={<MeetParticipants />} />
        <Route path="/Chat" element={<ChatList />} />
        <Route path="/Chat/:id" element={<ChatDetail />} />
        <Route path="/Map" element={<MapView />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/Board/:type" element={<BoardList />} />
        <Route path="/Board/:type/:id" element={<BoardDetail />} />
        <Route path="/Board/Write" element={<BoardWrite />} />
        <Route path="/UserInfo" element={<UserInfo />} />
        <Route path="/BlockedUser" element={<BlockedUser />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
