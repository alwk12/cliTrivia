const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TIME_LIMIT = 10;

const questions = [
  {
    question: "Which is for styling a web page?",
    options: ["HTML", "CSS", "js"],
    answer: 2,
  },
  {
    question: "Which team belongs to epl?",
    options: ["mancity", "barcelona", "real"],
    answer: 1,
  },
  {
    question: "Who is not a wrestler?",
    options: ["cena", "ronaldo", "orton"],
    answer: 2,
  },
  {
    question: "Which is not a game",
    options: ["football", "chess", "eating"],
    answer: 3,
  },
  {
    question: "kwashiakor is coz of?",
    options: ["protein", "fruit", "cabs"],
    answer: 1,
  },
];

let current = 0;
let started = false;
let startTime = 0;
let timer;
const results = [];

function askQuestion() {
  if (current === questions.length) {
    endGame();
    return;
  }

  const item = questions[current];
  console.log("Question " + (current + 1) + ": " + item.question);
  item.options.forEach(function (option, index) {
    console.log("  " + (index + 1) + ". " + option);
  });

  timer = setTimeout(function () {
    console.log("Time is up!");
    results.push(false);
    current++;
    askQuestion();
  }, TIME_LIMIT * 1000);
}

function endGame() {
  const seconds = Math.round((Date.now() - startTime) / 1000);
  const score = results.filter(function (result) {
    return result === true;
  }).length;

  console.log("Game Ober");
  for (let i = 0; i < results.length; i++) {
    console.log(
      "Question " + (i + 1) + ": " + (results[i] ? "correct" : "wrong"),
    );
  }
  console.log("Score: " + score + " out of " + questions.length);
  console.log("Time: " + seconds + " seconds");
  rl.close();
}

rl.on("line", function (input) {
  if (!started) {
    started = true;
    startTime = Date.now();
    askQuestion();
    return;
  }

  const choice = Number(input);
  const item = questions[current];

  if (!Number.isInteger(choice) || choice < 1 || choice > item.options.length) {
    console.log("Please type a number from 1 to " + item.options.length);
    return;
  }

  clearTimeout(timer);
  if (choice === item.answer) {
    console.log("Correct!");
    results.push(true);
  } else {
    console.log("Wrong! The answer was option " + item.answer);
    results.push(false);
  }
  current++;
  askQuestion();
});

console.log(
  "Welcome to alvin's Trivia You have " + TIME_LIMIT + " seconds per question.",
);
console.log("Press Enter to start.");
