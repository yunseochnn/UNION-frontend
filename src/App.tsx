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
import MyPosts from './pages/MyPagePost/MyPosts';
import MyMeetings from './pages/MyPagePost/MyMeetings';
import MyComments from './pages/MyPagePost/MyComments';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<SocialLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search:type" element={<Search />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/meet/:id" element={<MeetDetail />} />
        <Route path="/meet/write" element={<MeetWrite />} />
        <Route path="/meet/participants/:id" element={<MeetParticipants />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/chat/private" element={<ChatDetail />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:type" element={<BoardList />} />
        <Route path="/board/:type/:id" element={<BoardDetail />} />
        <Route path="/board/write/:type" element={<BoardWrite />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/blockeduser" element={<BlockedUser />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/mymeetings" element={<MyMeetings />} />
        <Route path="/mycomments" element={<MyComments />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
