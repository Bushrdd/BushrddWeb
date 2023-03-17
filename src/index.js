import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MouseTrack from './pages/MouseTrack/MouseTrack';
import SongPlayer from './pages/SongPlayer/SongPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SongPlayer />
  </React.StrictMode>
);

