import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './Components/Pages/HomePage';
import ChainInfo from './Components/Pages/ChainInfo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <nav>
        <ul>
          <li><Link to={'/home'} className="nav-link">Home</Link></li>
          <li><Link to={'/chain-info'} className="nav-link">Chain-info</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/chain-info" element={<ChainInfo/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
