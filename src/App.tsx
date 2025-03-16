import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NameInput from './components/NameInput';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInput />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;