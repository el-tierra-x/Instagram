import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

//component imports
import Navbar from './components/logical/Navbar';
import PreviewModal from './components/logical/PreviewModal';
import NewsFeedPage from './components/pages/NewsFeedPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UserProfilePage from './components/pages/UserProfilePage';
import { useAppSelector } from './store/hooks';

function App() {

  const photoIsBeingPreviewed = useAppSelector(state=>state.currentPreviewPhotoID !== null);
  return (
    <div className="App"
    style={{
      height : '100vh',
      overflow : photoIsBeingPreviewed ?  'hidden' : 'auto'}}
    >
        <Router>
          <Navbar/>
          <Routes>
            <Route element={<NotFoundPage/>} path="*"/>
            <Route element={<NewsFeedPage/>} path="/"/>
            <Route element={<UserProfilePage/>} path={"/profile/:username"}/>
          </Routes>
          <PreviewModal/>
        </Router>
    </div>
  );
}

export default App;
