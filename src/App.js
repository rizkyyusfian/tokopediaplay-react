// import './index.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NonExistPage from './pages/NonExistPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const App = () => {
  const [videoData, setVideoData] = useState(null);
  const { logout } = useAuth();

  const handleVideoData = (data) => {
    setVideoData(data);
  };

  return (
    <>
      <Routes>
        {/* <Route path="/:id" element={<DetailPage />} />
        <Route path="/" element={<HomePage handleVideoData={handleVideoData} />} /> */}

        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={ <CallLogout logout={logout} /> } />
        <Route path="*" element={<NonExistPage/>} />
      </Routes>
    </>
  );
};
export default App;

function CallLogout({logout}) {
  logout();
}