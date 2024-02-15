import { useEffect, useState } from 'react';
import './App.css';

const questionsData = [
  {
    id: 1,
    question: "През коя година е основана българия?",
    answers: [
      { text: "861г.", correct: false },
      { text: "681г.", correct: true },
      { text: "955г.", correct: false },
      { text: "1012г.", correct: false }
    ]
  },
  {
    id: 2,
    question: "През коя година е основан Volkswagen(VW)?",
    answers: [
      { text: "1950г.", correct: false },
      { text: "1937г.", correct: true },
      { text: "955г.", correct: false },
      { text: "1012г.", correct: false }
    ]
  },
  {
    id: 3,
    question: "В кой град може да се побере цялото население на света?",
    answers: [
      { text: "София", correct: false },
      { text: "Токио", correct: false },
      { text: "Лос Анджелис", correct: true },
      { text: "Ню Йорк", correct: false }
    ]
  },
  {
    id: 4,
    question: "На какво са кръстени Канараски острови?",
    answers: [
      { text: "Кучета", correct: true },
      { text: "Птици", correct: false },
      { text: "Змии", correct: false },
      { text: "Делфини", correct: false }
    ]
  },
  {
    id: 5,
    question: "Колко градуса е най-ниската регистрирана температура някога? (в Целзий)",
    answers: [
      { text: "-69", correct: false },
      { text: "-112", correct: false },
      { text: "-32", correct: false },
      { text: "-97", correct: true },
    ]
  },
  {
    id: 6,
    question: "На колко е равно една на степен минус едно?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: true },
      { text: "-1", correct: false },
      { text: "Няма такова число", correct: false },
    ]
  },
  {
    id: 7,
    question: "Кой е изобразен на новата полимерна банкнота от 100 рубли, посветена на Световното първенство по футбол?",
    answers: [
      { text: "Лев Яшин", correct: true },
      { text: "Олег Блохин", correct: false },
      { text: "Андрий Шевченко", correct: false },
      { text: "Олег Саленко", correct: false },
    ]
  },
  {
    id: 8,
    question: "Какво не трябва да вижда младоженецът преди сватбата според разпостраненото суеверие?",
    answers: [
      { text: "Обувките на шаферките", correct: false },
      { text: "Банковата сметка на кума", correct: false },
      { text: "Роклята на булката", correct: true },
      { text: "Точилката на тъщата", correct: false },
    ]
  },
  {
    id: 9,
    question: "Кой е правилният правопис на думата \"паркинг\" в множествено число?",
    answers: [
      { text: "Много паркинг", correct: false },
      { text: "Паркинги", correct: true },
      { text: "Паркингове", correct: false },
      { text: "Паркинзи", correct: false },
    ]
  },
  {
    id: 10,
    question: "Според думите на атинския законодател Солон тайната на вечната младост е всеки ден:",
    answers: [
      { text: "Да се чете на глас", correct: false },
      { text: "Да се пише огледално", correct: false },
      { text: "Да се смята наум", correct: false },
      { text: "Да се учи нещо ново", correct: true },
    ]
  },
]

const shuffledQuestions = questionsData.sort(() => Math.random() - .5)

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState(null);
  const [points, setPoints] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  console.log(shuffledQuestions);

  useEffect(() => {
    setQuestion(shuffledQuestions[currentQuestion - 1]);
  }, [questionsData, currentQuestion])

  const handleClickQuestion = (answer) => {
    if (currentQuestion === questionsData.length) {
      setIsEnded(true);
    }

    if (answer.correct) {
      setPoints((state) => state + 1);
      setCorrectAnswers((prev) => [...prev, { question, answerText: answer.text }])
    }

    setCurrentQuestion((prev) => prev + 1);
  }

  const restartGame = () => {
    setCurrentQuestion(1);
    setQuestion(null);
    setIsEnded(false)
    setIsStarted(false);
  }

  return (
    <>
      <div className={`container ${isEnded ? "end" : ""}`}>


        {!isStarted ? (
          <>
            <div className='start-text'>
              <h1>Welcome to my simple quiz</h1>
              <p>Click the start button to proceed</p>
            </div>
            <button onClick={() => setIsStarted(true)} className='start-btn'>Start Game</button>
          </>
        ) : (
          <>
            <h1 className='question'>{question?.question}</h1>
            <div className="answers-container">
              {question?.answers.map((a) => (
                <button onClick={() => handleClickQuestion(a)} className='answer'>{a.text}</button>
              ))}
            </div>
          </>
        )}

        {isEnded && (
          <>
            <div>
              <h2 className='result-points'>Your result is: {points} Points</h2>
            </div>
            <hr />
            <h3 className='correct-answers-heading'>Your correct answers:</h3>
            <div className='correct-answers'>
              {correctAnswers.map((a) => (
                <div className='correct-data'>
                  <h2>{a.question.question}</h2>
                  <p>- {a.answerText}</p>
                </div>
              ))}
            </div>
            <hr />
            <button onClick={restartGame} className='restart-btn'>Restart Game?</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
