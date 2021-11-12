// HTML elements
var introPage = document.querySelector("#intro-container");
var quizRules = document.querySelector("#quiz-rules");
var startQuiz = document.querySelector("#start-quiz");
var startQuizButton = document.querySelector("#start-btn");
var questionContainer = document.querySelector("#question-container");
var quizQuestions = document.querySelector("#questions");
var answerButton1 = document.querySelector("#answer-btn1");
var answerButton2 = document.querySelector("#answer-btn2");
var answerButton3 = document.querySelector("#answer-btn3");
var answerButton4 = document.querySelector("#answer-btn4");
var displayEl = document.querySelector("#correct-answer");
var displayEl2 = document.querySelector("#incorrect-answer");
var lastPage = document.querySelector("#last-page");
var enterInitials = document.querySelector("#enter-initials");
var submitButton = document.querySelector("#submit-btn");
var highScores = document.querySelector("#high-scores");
var goBackButton = document.querySelector("#go-back");
var timerEl = document.querySelector("#timer");

// Quiz questions and answers
var questionCounter = 0;
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts",
  },
  {
    question: "The condition of an if/else statement is enclosed within ____.",
    answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the Above",
    ],
    correctAnswer: "All of the Above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned variables.",
    answers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    correctAnswer: "Parenthesis",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal/Bash", "For Loops", "Console Log"],
    correctAnswer: "Console Log",
  },
];

// Start timer at beginning of quiz
var timeLeft = 59;
var timerStart = function () {
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Timer: " + timeLeft;
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
};

// Start quiz
var startQuiz = function () {
  startQuizButton.classList.add("hidden");
  introPage.classList.add("hidden");
  timerStart();
  questionsContainer();
};

//Create question elements
var questionsContainer = function () {
  quizQuestions.classList.remove("questions");
  questionContainer.classList.remove("hidden");
  quizQuestions.textContent = questions[questionCounter].question;
  answerButton1.textContent = questions[questionCounter].answers[0];
  answerButton2.textContent = questions[questionCounter].answers[1];
  answerButton3.textContent = questions[questionCounter].answers[2];
  answerButton4.textContent = questions[questionCounter].answers[3];
};

// Check answer for correct or incorrect
var checkAnswer = function (event) {
  var correctAnswer = questions[questionCounter].correctAnswer;
  var currentAnswer = event.target.textContent;
  displayEl.classList.remove("hidden");
  displayEl2.classList.remove("hidden");

  if (currentAnswer === correctAnswer) {
    displayEl2.classList.add("hidden");
    displayEl.textContent = "Correct!";
  } else {
    displayEl.classList.add("hidden");
    displayEl2.textContent = "Wrong!";
    timeLeft -= 15;
  }

  questionCounter++;
  if (questionCounter === questions.length) {
    endQuiz();
  } else {
    questionsContainer();
  }
};

// End of quiz
var endQuiz = function () {
  clearInterval(timeInterval);
  questionContainer.classList.add("hidden");
  lastPage.classList.remove("hidden");
  enterInitials.textContent = "Your Final Score Is " + timeLeft;
  timerEl.classList.add("hidden");
  setTimeout(function () {
    displayEl.setAttribute("class", "hidden");
  }, 1000);
  setTimeout(function () {
    displayEl2.setAttribute("class", "hidden");
  }, 1000);
 };

// Add score to high score list and save to local storage
var newScore = function () {
  var newScores = JSON.parse(window.localStorage.getItem("high-scores")) || [];
  newScores.forEach(function (scoreData) {
    var scoreValueEl = document.createElement("ol");
    scoreValueEl.textContent =
      "Name: " + scoreData.name + " - " + "Score: " + scoreData.score;
    scoreValueEl.className = "high-scores";
    highScores.appendChild(scoreValueEl);
  });
};

var saveScore = function () {
  var newScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  var playerInitials = {
    name: enterInitials.value,
    score: timeLeft,
  };
  newScores.push(playerInitials);
  window.localStorage.setItem("highscores", JSON.stringify(highScores));
};

startQuizButton.addEventListener("click", startQuiz);
answerButton1.addEventListener("click", checkAnswer);
answerButton2.addEventListener("click", checkAnswer);
answerButton3.addEventListener("click", checkAnswer);
answerButton4.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", highScores);
