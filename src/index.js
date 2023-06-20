import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MouseTrack from './pages/MouseTrack/MouseTrack';
import SongPlayer from './pages/SongPlayer/SongPlayer';
import Mahjong from './pages/Mahjong/Mahjong';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink,
  withRouter,
} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song" element={<SongPlayer />} />
          <Route path="/mahjong" element={<Mahjong />} />
        </Routes>
      </Router >
    </div>
  </React.StrictMode>
);

