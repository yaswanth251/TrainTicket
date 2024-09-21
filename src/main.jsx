import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Book from './Book'; // Make sure to import the Book component
import Confirmation from './Confirmation';
import Receipt from './Receipt';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book" element={<Book />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/Receipt" element={<Receipt />} />

      </Routes>
    </Router>
  </React.StrictMode>,
);
