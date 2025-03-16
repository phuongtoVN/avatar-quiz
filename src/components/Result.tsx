import React from 'react';
import { useLocation } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const { name, result } = location.state as { name: string; result: string };

  // Determine the background image based on the result
  const getBackgroundImage = () => {
    switch (result.toLowerCase()) {
      case 'fire':
        return require('../img/fire.jpg');
      case 'air':
        return require('../img/air.png');
      case 'earth':
        return require('../img/earth.png');
      case 'water':
        return require('../img/water.jpg');
      case 'avatar':
        return require('../img/avatar.jpeg');
      default:
        return require('../img/bg1.jpg'); // Fallback image
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${getBackgroundImage()})`, // Set dynamic background image
        backgroundSize: 'cover', // Ensure the background covers the entire screen
        backgroundPosition: 'center', // Center the background image
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h1>Result</h1>
        {result === 'Avatar' ? (
          <p>{name}, you have mastered all 4 elements! You are the Avatar!</p>
        ) : (
          <p>
            {name}, your element is: <strong>{result.toUpperCase()}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;