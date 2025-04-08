// Quiz.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'How do you handle stress?',
    options: ['Meditate', 'Go for a walk', 'Confront it head-on', 'Go with the flow'],
  },
  {
    question: 'What gives you the most satisfaction at the end of the day?',
    options: [
      'Feeling mentally balanced',
      'Seeing tangible progress',
      'Knowing you made an impact',
      'Feeling emotionally fulfilled',
    ],
  },
  {
    question: "Which scenario sounds most rewarding to you?",
    options: [
      'Having a meaningful one-on-one conversation',
      'Successfully completing a long-term goal',
      'Leading a passionate group through a challenge',
      'Experiencing something spontaneous and emotionally freeing',
    ],
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
    question: 'You enter a room full of strangers. What do you do first?',
    options: [
      'Observe and read the room quietly',
      'Stick to a comfortable corner until you ease in',
      'Start conversations and bring energy',
      'Float from group to group, feeling it out',
    ],
  },
  {
    question: 'Which type of compliment means the most to you?',
    options: [
      'You make people feel calm and understood',
      'You’re always grounded and reliable',
      'You’re passionate and full of energy',
      'You’re adaptable and open-minded',
    ],
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
    question: 'Your ideal role in a team is:',
    options: [
      'The visionary who sees the bigger picture',
      'The planner who brings stability',
      'The motivator who sparks momentum',
      'The mediator who keeps things flowing',
    ],
  },
  {
    question: "How do you usually approach learning something new?",
    options: [
      'Read, reflect, and explore ideas first',
      'Create a structured plan and follow it step-by-step',
      'Jump in headfirst — you learn by doing',
      'Feel it out intuitively and adapt as you go',
    ],
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
        'Meditate', 'Feeling mentally balanced', 'Having a meaningful one-on-one conversation',
        'Reading', 'Analyze carefully', 'Observe and read the room quietly',
        'You make people feel calm and understood', 'Calm and logical', 'Think it through',
        'Exploring new ideas', 'The visionary who sees the bigger picture', 'Read, reflect, and explore ideas first'
      ].includes(answer)) counts.air++;
      if ([
        'Go for a walk', 'Seeing tangible progress', 'Successfully completing a long-term goal',
        'Gardening', 'Trust your instincts', 'Stick to a comfortable corner until you ease in',
        'You’re always grounded and reliable', 'Direct and practical', 'Tackle it head-on',
        'Hiking in nature', 'The planner who brings stability', 'Create a structured plan and follow it step-by-step'
      ].includes(answer)) counts.earth++;
      if ([
        'Confront it head-on', 'Knowing you made an impact', 'Leading a passionate group through a challenge',
        'Exercising', 'Follow your heart', 'Start conversations and bring energy',
        'You’re passionate and full of energy', 'Emotional and expressive', 'Feel your way through',
        'Thrill-seeking activities', 'The motivator who sparks momentum', 'Jump in headfirst — you learn by doing'
      ].includes(answer)) counts.fire++;
      if ([
        'Go with the flow', 'Feeling emotionally fulfilled', 'Experiencing something spontaneous and emotionally freeing',
        'Socializing', 'Go with the flow', 'Float from group to group, feeling it out',
        'You’re adaptable and open-minded', 'Flexible and adaptable', 'Adapt and overcome',
        'Relaxing by the water', 'The mediator who keeps things flowing', 'Feel it out intuitively and adapt as you go'
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
