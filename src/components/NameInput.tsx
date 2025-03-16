import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameInput: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (name) {
      navigate('/quiz', { state: { name } });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require('../img/bg1.jpg')})`, // Add background image
        backgroundSize: 'cover', // Ensure the background covers the entire screen
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh', // Ensure the background covers the full height of the screen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          padding: '15px', // Reduced padding for smaller screens
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '100%',
          width: '90%', // Use percentage width for better responsiveness
          margin: '0 20px', // Add margin to prevent touching screen edges
        }}
      >
        <h1 style={{ fontSize: '20px', marginBottom: '15px' }}>Find out your element</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          style={{
            width: '90%',
            padding: '8px', // Reduced padding for smaller screens
            fontSize: '14px', // Smaller font size for smaller screens
            marginBottom: '15px', // Reduced margin for smaller screens
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '8px', // Reduced padding for smaller screens
            fontSize: '14px', // Smaller font size for smaller screens
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default NameInput;