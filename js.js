const questions = [
    {
      text: "How do you properly link a stylesheet to an HTML page?",
      answers: [
        'A) <link rel="stylesheet" href="./style.css" />',
        'B) <link rel="stylesheet" src="./style.css" />',
        'C) <style type="css" href="./style.css" />',
        'D) <a rel="stylesheet" href="./style.css" />',
      ],
      correct: "A",
    },
    {
      text:
        "How would you properly access the third item of an array named 'myArray' in Javascript?",
      answers: [
        "A) myArray(3)",
        "B) myArray[3]",
        "C) myArray[2]",
        "D) myArray.3",
      ],
      correct: "C",
    },
    {
      text:
        "Which of the following values is considered truthy in Javascript?",
      answers: ["A) undefined", 'B) "0"', "C) 0", 'D) ""'],
      correct: "B",
    },
    {
      text: "What is a regular expression?",
      answers: [
        "A) A pattern for matching characters or groups of characters in strings.",
        "B) Any singular arithmetic operation, such as multiplying a number by another number.",
        "C) A function that accepts no arguments and returns a primitive data type, such as a number, string, or boolean.",
        "D) A standard of practice in which developers aim to declare variables using clear, easy to read names as opposed to ambiguous, arbitrary characters.",
      ],
      correct: "A",
    },
    {
      text:
        "Which of the following time complexities is most efficient as input size increases?",
      answers: ["A) O(n)", "B) O(log n)", "C) O(1)", "D) O(n log n)"],
      correct: "C",
    },
    {
      text: "Which of the following best describes Node.js?",
      answers: [
        "A) A Javascript library designed to more easily interface with the DOM.",
        "B) A platform for hosting websites and web apps.",
        "C) An external run time environment for executing Javascript code outside of the browser.",
        "D) A popular blogposting site for Javascript developers.",
      ],
      correct: "C",
    },
    {
      text: "What does ORM stand for?",
      answers: [
        "A) Objective Regulation Mechanism",
        "B) Official React Manual",
        "C) Online Runtime Manager",
        "D) Object Relational Mapping",
      ],
      correct: "D",
    },
    {
      text: "What is one advantage of using GraphQL?",
      answers: [
        "A) You are able to display data from your server in a preformatted graph.",
        "B) GraphQL is the only way to make requests to a database with a Node.js backend.",
        "C) GraphQL is made by Facebook, so Facebook developers will routinely debug all of your GraphQL projects for you!",
        "D) You are not restricted by API endpoints and can therefore access specific amounts and types of data in a single request.",
      ],
      correct: "D",
    },
    {
      text:
        "Which of the following is the best description of Responsive Web Design?",
      answers: [
        "A) Implementing user feedback and review functionality in all of your websites.",
        "B) Designing features to be used only by authenticated users.",
        "C) Designing your Website to dynamically change it's appearance based on things such as screen-size and orientation.",
        "D) Ensuring every img attribute has an appropriate alt tag.",
      ],
      correct: "C",
    },
    {
      text: "What is a Progressive Web Application?",
      answers: [
        "A) An app that must be downloaded on a mobile device through an app store.",
        "B) An app that uses tools such as service workers and manifests to replicate functionalities of native apps.",
        "C) An app that has received an award for exceptional creativity.",
        "D) A term for an app that has met certain accessability criteria.",
      ],
      correct: "B",
    },
  ];
 
 // html elements
const timerEl = document.getElementById("timer-el");
const sections = {
  intro: document.getElementById("intro"),
  questionCard: document.getElementById("question-card"),
  results: document.getElementById("results"),
  highScores: document.getElementById("high-scores"),
};

// page load
let questionCounter;
let correctQuestions;
let timeRemaining;
let score;
function pageLoad() {
  timerEl.innerText = "";
  for (item in sections) sections[item].style.display = "none";
  sections.intro.style.display = "flex";
  questionCounter = 0;
  correctQuestions = 0;
  score = 0;
  timeRemaining = 120;
}
pageLoad();

// begin quiz
function beginQuiz() {
  document.getElementById(
    "timer-el"
  ).innerText = `Time Remaining: ${timeRemaining}`;
  startTimer();
  questionCounter = 0;
  renderQuestion(questions[questionCounter]);
}

// timer
function startTimer() {
  interval = setInterval(countdown, 1000);
}

function countdown() {
  if (timeRemaining <= 0) return renderResults();
  timeRemaining--;
  document.getElementById(
    "timer-el"
  ).innerText = `Time Remaining: ${timeRemaining}`;
}

function stopTimer() {
  clearInterval(interval);
}

// render question
function renderQuestion(question) {
  if (questionCounter >= questions.length) return renderResults();
  sections.intro.style.display = "none";
  sections.questionCard.style.display = "flex";
  document.getElementById("question-notification-el").innerText = "";
  document.getElementById("question-text-el").innerText = question.text;
  document.getElementById("answers-container-el").innerHTML = "";
  for (let i = 0; i < question.answers.length; i++) {
    let btn = document.createElement("button");
    btn.className = "answer-choice";
    btn.innerText = question.answers[i];
    btn.className = "hoverable-button answer-choice";
    btn.onclick = captureAnswer;
    document.getElementById("answers-container-el").appendChild(btn);
  }
}

// capture answer
function captureAnswer(e) {
  if (e.target.innerText.charAt(0) === questions[questionCounter].correct) {
    correctQuestions++;
    document.getElementById("question-notification-el").innerText = "Correct!";
  } else {
    timeRemaining > 10 ? (timeRemaining -= 10) : (timeRemaining = 0);
    document.getElementById(
      "question-notification-el"
    ).innerText = `Incorrect... The correct answer was ${questions[questionCounter].correct}`;
  }
  for (item in e.target.parentElement.children) {
    let button = e.target.parentElement.children[item];
    button.onclick = "";
    button.className = "answer-choice";
    if (button !== e.target) {
      button.className = "answer-choice non-selected";
    }
  }
  document.getElementById("next-question-button").innerText = "Continue";
}

// next question
function nextQuestion() {
  questionCounter++;
  renderQuestion(questions[questionCounter]);
}

// render results
function renderResults() {
  stopTimer();
  document.getElementById("timer-el").innerText = "";
  document.getElementById("invalid-initials-message").style.display = "none";
  score = timeRemaining + correctQuestions * 10;
  sections.questionCard.style.display = "none";
  sections.results.style.display = "flex";
  document.getElementById(
    "correct-questions-el"
  ).innerText = `${correctQuestions}/10`;
  document.getElementById("time-remaining-el").innerText = timeRemaining;
  document.getElementById("final-score-el").innerText = score;
  document.getElementById("initials").value = "";
}

// save score
let localStorageKey = "WEB-APIS-CHALLENGE-code-quiz-mikeyrod22";
function saveScore() {
  const initials = document.getElementById("initials").value.toUpperCase();
  if (initials.length !== 3 || initials.match(/[^a-zA-Z]/)) {
    document.getElementById("invalid-initials-message").style.display = "unset";
  } else {
    let store = window.localStorage.getItem(localStorageKey);
    let payload = { initials: initials, score: score };
    if (store) {
      let newStore = JSON.parse(store);
      newStore.push(payload);
      window.localStorage.setItem(localStorageKey, JSON.stringify(newStore));
    } else {
      window.localStorage.setItem(localStorageKey, JSON.stringify([payload]));
    }
    renderHighScores();
  }
}

// clear scores
function clearScores() {
  window.localStorage.removeItem(localStorageKey);
  renderHighScores();
}

// render high scores
function renderHighScores() {
  for (item in sections) sections[item].style.display = "none";
  sections.highScores.style.display = "flex";
  document.getElementById("high-scores-ol").innerHTML = "";
  document.getElementById("clear-scores-button").style.display = "none";
  let store = window.localStorage.getItem(localStorageKey);
  if (store) {
    document.getElementById("empty-storage-message").style.display = "none";
    document.getElementById("clear-scores-button").style.display = "unset";
    store = JSON.parse(store).sort((a, b) => (a.score < b.score ? 1 : -1));
    for (let i = 0; i < store.length; i++) {
      let li = document.createElement("li");
      li.innerText = `${store[i].initials}: ${store[i].score}`;
      document.getElementById("high-scores-ol").appendChild(li);
    }
  }
}
