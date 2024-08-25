import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // If you have any global styles
import App from './app'; // Import the App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
