import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { name?: string; result?: string };

  useEffect(() => {
    if (!state?.name || !state?.result) {
      navigate('/');
    }
  }, [state, navigate]);

  const { name = '', result = '' } = state;

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
        return require('../img/bg1.jpg');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '90%',
        }}
      >
        <h1>Result</h1>
        {result.toLowerCase() === 'avatar' ? (
          <p>{name}, you have mastered all 4 elements! You are the Avatar!</p>
        ) : (
          <p>
            {name}, your element is: <strong>{result.toUpperCase()}</strong>
          </p>
        )}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Retake the Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;