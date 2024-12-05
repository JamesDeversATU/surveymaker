import React, { useState } from 'react';

interface SurveyQuestion {
  id: number;
  text: string;
  type: string;
  options: {
    text: string;
    next_question_id: number | null;
  }[];
}

const surveyData = {
  questions: [
    {
      id: 1,
      text: "Are you male or female?",
      type: "multiple-choice",
      options: [
        { text: "Male", next_question_id: 2 },
        { text: "Female", next_question_id: 3 },
      ],
    },
    {
      id: 2,
      text: "Do you have children?",
      type: "yes-no",
      options: [
        { text: "Yes", next_question_id: 4 },
        { text: "No", next_question_id: null },
      ],
    },
    {
      id: 3,
      text: "Have you ever been pregnant?",
      type: "yes-no",
      options: [
        { text: "Yes", next_question_id: 4 },
        { text: "No", next_question_id: null },
      ],
    },
    {
      id: 4,
      text: "What is the age of your child?",
      type: "numeric",
      options: [],
    },
  ],
};

const SurveyTaker = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = surveyData.questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    // Move to the next question
    if (currentQuestion.options.length > 0) {
      const nextQuestionId = currentQuestion.options.find(
        (option) => option.text === answer
      )?.next_question_id;

      if (nextQuestionId === null) {
        handleSubmitSurvey();
      } else {
        const nextQuestionIndex = surveyData.questions.findIndex(
          (question) => question.id === nextQuestionId
        );
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    } else {
      handleSubmitSurvey();
    }
  };

  const handleNumericAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value;
    setAnswers((prevAnswers) => [...prevAnswers, numericValue]);
  };

  const handleSubmitSurvey = async () => {
    try {
      const response = await fetch('/api/saveResponses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
  
      if (response.ok) {
        alert('Your responses have been saved!');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Error: ' + error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };
  

  return (
    <div className="container">
      <h1>Survey</h1>
      <div>
        <h2>{currentQuestion.text}</h2>
        {['multiple-choice', 'yes-no'].includes(currentQuestion.type) && (
          <div>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.text)}
                className="btn btn-primary"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
        {currentQuestion.type === 'numeric' && (
          <div>
            <input
              type="number"
              onChange={handleNumericAnswer}
              className="input"
            />
            <button
              onClick={() => handleAnswer(answers[answers.length - 1])}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyTaker;
