import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import './styles.css'; 
import './index.css'; 

const container = document.getElementById('root');
const root = createRoot(container!); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);