// import './index.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import VideoDataContext from './contexts/VideoDataContext';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [videoData, setVideoData] = useState(null);

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
        <Route path="*" element={<div>NO MATCH</div>} />
      </Routes>
    </>
  );
};
export default App;