const questions = [
    {
      text: "When did First World War start?",
      answers: [
        'A) 1914',
        'B) 1915',
        'C) 1916',
        'D) 1917',
      ],
      correct: "A",
    },
    {
      text:
        "When did Second World War start?",
      answers: [
        "A) 1989",
        "B) 1945",
        "C) 1939",
        "D) 1935",
      ],
      correct: "C",
    },
    {
      text:
        "Who is the first women prime minister in UK?",
      answers: ["A) Barack Obama", 'B) Margaret Thatcher', "C) Bill Clinton", 'D) Hillary Clinton'],
      correct: "B",
    },
    {
      text: "How many continents are?",
      answers: [
        "A) 7",
        "B) 8",
        "C) 4.",
        "D) 10",
      ],
      correct: "A",
    },
    {
      text:
        "Who won USA election in 2020?",
      answers: ["Kennedy", "B) Barack Obama", "C) Joe Biden", "D) Geroge Bush"],
      correct: "C",
    },
    
    
    {
      text:
        "Who is owner os Starlink?",
      answers: [
        "A) Bill Gates.",
        "B) Desperado",
        "C) Elon Musk.",
        "D) Jeff Bezzos.",
      ],
      correct: "C",
    },
    {
      text: "Best social media according to 2023 poll?",
      answers: [
        "A) X-platform.",
        "B) Facebook.",
        "C) Tik-Tok.",
        "D) Instagram.",
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
  score = timeRemaining + correctQuestions * 7;
  sections.questionCard.style.display = "none";
  sections.results.style.display = "flex";
  document.getElementById(
    "correct-questions-el"
  ).innerText = `${correctQuestions}/7`;
  document.getElementById("time-remaining-el").innerText = timeRemaining;
  document.getElementById("final-score-el").innerText = score;
  document.getElementById("initials").value = "";
}

// save score
let localStorageKey = "WEB-APIS-CHALLENGE-code-quiz-mikeyrod22";
function saveScore() {
  const initials = document.getElementById("initials").value.toUpperCase();
  if (initials.length !== 5 || initials.match(/[^a-zA-Z]/)) {
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
