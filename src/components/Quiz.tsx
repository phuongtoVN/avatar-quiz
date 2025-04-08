import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'How do you handle stress?',
    options: ['Meditate', 'Go for a walk', 'Confront it head-on', 'Go with the flow'],
  },
  {
    question: 'What is your favorite environment?',
    options: ['Mountains', 'Forest', 'Desert', 'Ocean'],
  },
  {
    question: 'What is your personality like?',
    options: ['Thoughtful', 'Practical', 'Passionate', 'Adaptable'],
  },
  {
    question: 'What is your preferred way to spend free time?',
    options: ['Reading', 'Gardening', 'Exercising', 'Socializing'],
  },
  {
    question: 'How do you make decisions?',
    options: ['Analyze carefully', 'Trust your instincts', 'Follow your heart', 'Go with the flow'],
  },
  {
    question: 'What is your favorite season?',
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
  },
  {
    question: 'What is your favorite element in nature?',
    options: ['Wind', 'Rocks', 'Fire', 'Water'],
  },
  {
    question: 'What is your communication style?',
    options: ['Calm and logical', 'Direct and practical', 'Emotional and expressive', 'Flexible and adaptable'],
  },
  {
    question: 'What is your approach to challenges?',
    options: ['Think it through', 'Tackle it head-on', 'Feel your way through', 'Adapt and overcome'],
  },
  {
    question: 'What is your favorite type of adventure?',
    options: ['Exploring new ideas', 'Hiking in nature', 'Thrill-seeking activities', 'Relaxing by the water'],
  },
  {
    question: 'What is your favorite color?',
    options: ['Blue', 'Green', 'Red', 'Yellow'],
  },
  {
    question: 'What is your favorite animal?',
    options: ['Eagle', 'Badgermole', 'Dragon', 'Koi Fish'],
  },
];

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { name?: string };

  useEffect(() => {
    if (!state?.name) {
      navigate('/');
    }
  }, [state, navigate]);

  const { name } = state;
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  const handleAnswer = (questionIndex: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionIndex]: option }));

    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length && newAnswers.every((answer) => answer !== '')) {
      const result = calculateResult(newAnswers);
      navigate('/result', { state: { name, result } });
    }
  };

  const calculateResult = (answers: string[]): string => {
    const counts: { [key: string]: number } = { air: 0, earth: 0, fire: 0, water: 0 };
    answers.forEach((answer) => {
      if ([
        'Meditate', 'Mountains', 'Thoughtful', 'Reading', 'Spring', 'Wind',
        'Calm and logical', 'Think it through', 'Exploring new ideas', 'Blue', 'Eagle'
      ].includes(answer)) counts.air++;
      if ([
        'Go for a walk', 'Forest', 'Practical', 'Gardening', 'Trust your instincts',
        'Summer', 'Rocks', 'Direct and practical', 'Tackle it head-on', 'Hiking in nature',
        'Green', 'Badgermole'
      ].includes(answer)) counts.earth++;
      if ([
        'Confront it head-on', 'Desert', 'Passionate', 'Exercising', 'Follow your heart',
        'Autumn', 'Fire', 'Emotional and expressive', 'Feel your way through', 'Thrill-seeking activities',
        'Red', 'Dragon'
      ].includes(answer)) counts.fire++;
      if ([
        'Go with the flow', 'Ocean', 'Adaptable', 'Socializing', 'Go with the flow',
        'Winter', 'Water', 'Flexible and adaptable', 'Adapt and overcome', 'Relaxing by the water',
        'Yellow', 'Koi Fish'
      ].includes(answer)) counts.water++;
    });

    const allEqual = Object.values(counts).every((val) => val === counts.air);
    if (allEqual) return 'Avatar';

    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, white, lightgreen)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Quiz</h1>
      {questions.map((q, questionIndex) => (
        <div
          key={questionIndex}
          style={{
            marginBottom: '10px',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{q.question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((option, optionIndex: number) => (
              <button
                key={optionIndex}
                onClick={() => handleAnswer(questionIndex, option)}
                style={{
                  padding: '8px',
                  backgroundColor: selectedOptions[questionIndex] === option ? '#4CAF50' : '#f0f0f0',
                  color: selectedOptions[questionIndex] === option ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;