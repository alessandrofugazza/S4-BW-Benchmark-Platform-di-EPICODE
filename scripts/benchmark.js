// CLOCK //

const maxTimer = 60;
let secondsRemaining = maxTimer;
let timerIntervalID = null;
const decreaseTimer = () => {
  if (secondsRemaining) {
    secondsRemaining -= 1;
    timer.innerText = secondsRemaining;
    const clock = document.querySelector(".headerQuestionsDiv");
    const timePerc = (secondsRemaining / maxTimer) * 100;
    if (secondsRemaining >= 10) {
      clock.style.backgroundImage = `radial-gradient(#3E1655 50%,transparent 50%),conic-gradient(#efefef3b 0% ${timePerc}%,#01ffff 0% 100%)`;
    } else {
      clock.style.backgroundImage = `radial-gradient(#3E1655 50%,transparent 50%),conic-gradient(#efefef3b 0% ${timePerc}%,#da0000 0% 100%)`;
    }
  } else {
    remainingQuestions--; //todo make a function
    if (remainingQuestions === 0) {
      resetQuestions();
    }
    questionNumber++;
    selectQuestion();
    clearInterval(timerIntervalID);
    secondsRemaining = maxTimer;
    timer.innerText = secondsRemaining;
    const clock = document.querySelector(".headerQuestionsDiv");
    clock.style.backgroundImage = `radial-gradient(#3E1655 50%,transparent 50%),conic-gradient(#efefef3b 0% 100%,#01ffff 100% 100%)`;
    timerIntervalID = setInterval(decreaseTimer, 1000);
  }
};

// ANSWER FORM //

let correctAnswers = 0;
let question = null;
let questionNumber = 1;

const selectQuestion = () => {
  // pull a random question from an array of questions
  const randIndex = Math.floor(Math.random() * remainingQuestions);
  question = questions[randIndex];
  questions.splice(randIndex, 1);
  // randomize the answers' order
  const answers = [question.correct_answer, ...question.incorrect_answers];
  const randomizedAnswers = [];
  for (let i = answers.length; i; i--) {
    const randIndex = Math.floor(Math.random() * i - 1);
    const answer = answers.splice(randIndex, 1);
    randomizedAnswers.push(answer[0]);
  }
  formQuestion.innerHTML = question.question;
  //replace question and answers with the newly selected question
  answerForm.innerHTML = "";
  for (let i = 0; i < randomizedAnswers.length; i++) {
    const answerFormInput = document.createElement("input");
    answerFormInput.setAttribute("type", "radio");
    answerFormInput.setAttribute("id", `answer${i + 1}`);
    answerFormInput.setAttribute("name", "answer");
    answerFormInput.setAttribute("value", randomizedAnswers[`${i}`]);
    answerFormInput.classList.add("answer");
    answerForm.appendChild(answerFormInput);
    //todo change setattribute
    const answerFormLabel = document.createElement("label");
    answerFormLabel.setAttribute("for", `answer${i + 1}`);
    answerFormLabel.innerHTML = randomizedAnswers[i];
    answerFormLabel.addEventListener("click", highlightSelectedAnswer);
    answerForm.appendChild(answerFormLabel);
  }
  const formBr = document.createElement("br");
  answerForm.appendChild(formBr);
  const formQuestionNumber = document.createElement("p");
  formQuestionNumber.classList.add("numberOfQuestions");
  formQuestionNumber.innerHTML = `QUESTION ${questionNumber} <span>/ ${totalQuestions}</span>`;
  answerForm.appendChild(formQuestionNumber);
  const btn = document.createElement("input");
  btn.setAttribute("type", "submit");
  if (remainingQuestions > 1) {
    btn.setAttribute("value", "SKIP"); //todo add right arrow
  } else {
    btn.setAttribute("value", "SKIP - FINISH");
  }
  btn.classList.add("submit");
  answerForm.appendChild(btn);
};

const highlightSelectedAnswer = e => {
  const prevAnswer = document.getElementById("selectedAnswer");
  //todo remove the if somehow
  if (prevAnswer) {
    prevAnswer.removeAttribute("id");
  }
  e.target.setAttribute("id", "selectedAnswer"); //todo use another method
  const btn = document.querySelector(".submit");
  if (remainingQuestions > 1) {
    btn.setAttribute("value", "NEXT");
  } else {
    btn.setAttribute("value", "FINISH");
  }
};

const nextQuestion = e => {
  e.preventDefault();
  clearInterval(timerIntervalID);
  // check if answer is correct
  const answerGiven = document.querySelector('input[name="answer"]:checked');
  if (answerGiven) {
    if (question.correct_answer === answerGiven.value) {
      correctAnswers += 1;
      const test = document.getElementById("selectedAnswer");
      test.setAttribute("id", "green");
    } else {
      const test = document.getElementById("selectedAnswer");
      test.setAttribute("id", "red");
    }
    let answers = document.getElementsByTagName("label");
    answers = Array.from(answers);
    answers.forEach(answer => {
      answer.removeEventListener("click", highlightSelectedAnswer);
    });
    setTimeout(testFunction, 1000);
  } else {
    testFunction();
  }
};

const testFunction = function () {
  questionNumber++;
  remainingQuestions--;
  if (remainingQuestions === 0) {
    // placeholder when there are no more questions
    resetQuestions();
    return;
  }

  // pull another question from the array
  selectQuestion();
  // reset the timer
  // clearInterval(timerIntervalID);
  secondsRemaining = maxTimer;
  timer.innerText = secondsRemaining;
  const clock = document.querySelector(".headerQuestionsDiv");
  clock.style.backgroundImage = `radial-gradient(#3E1655 50%,transparent 50%),conic-gradient(#efefef3b 0% 100%,#01ffff 100% 100%)`;
  timerIntervalID = setInterval(decreaseTimer, 1000);
};

const startQuiz = () => {
  // CLOCK //
  const timer = document.querySelector("header div p:nth-of-type(2)"); //todo use class
  timer.innerText = secondsRemaining;
  // ANSWER FORM //
  const answerForm = document.querySelector("form");
  const formQuestion = document.querySelector("h2");
  const totalQuestions = questions.length;
  let remainingQuestions = totalQuestions;
  answerForm.addEventListener("submit", nextQuestion);
};

let difficulty = null;
let totalQuestions = null;

window.onload = () => {
  const startQuizBtn = document.querySelector("button");
  startQuizBtn.onclick = e => {
    e.preventDefault();
    totalQuestions = document.querySelector("input");
    // userInput = Number(userInput);
    // if (isNaN(userInput)) {
    //   alert("invalid question amount");
    //   return;
    // }
    if (!totalQuestions.checkValidity()) {
      alert("please choose an integer between 10 and 40");
      totalQuestions.value = "";
      return;
    }
    let userInput = totalQuestions.value;
    totalQuestions = userInput;
    diff = document.querySelector("#difficulty").value;
    filterQuestions();
    document.querySelector("body").innerHTML = `
    <main>
    <header class="question-header">
        <img src="assets/img/epicode_logo.png" alt="epicode_logo" class="epicode_logo" />
         <div class="headerQuestionsDiv" style="background-image:radial-gradient(#3E1655 50%,transparent 50%),conic-gradient(#efefef3b 0% 100%,#01ffff 100% 100%);">
          <p class="headerPQuestions">SECONDS</p>
          <p class="headerPQuestions">16</p>
          <p class="headerPQuestions">REMAINING</p>
         </div>
      </header>
        <article class="question-main">
          <section>
            <h2 class="h2Questions">How can I create a checkbox in HTML?</h2>
            <div class="answer-box">
              <form></form>
            </div>
          </section>
        </article>
      </main>
    `;
    // CLOCK //
    timer = document.querySelector("header div p:nth-of-type(2)"); //todo use class
    timer.innerText = secondsRemaining;
    // ANSWER FORM //
    answerForm = document.querySelector("form");
    formQuestion = document.querySelector("h2");
    remainingQuestions = totalQuestions;
    answerForm.addEventListener("submit", nextQuestion);
    selectQuestion();
    timerIntervalID = setInterval(decreaseTimer, 1000);
  };
};

let timer = null;
let answerForm = null;
let formQuestion = null;
let remainingQuestions = null;
let questions = null;

const filterQuestions = () => {
  switch (diff) {
    case "easy":
      questions = [...easyQuestions];
      break;
    case "medium":
      questions = [...mediumQuestions];
      break;
    case "hard":
      questions = [...hardQuestions];
      break;
  }
  const filteredQuestions = [];
  const questionsArchiveLen = questions.length;
  for (let i = 0; i < totalQuestions; i++) {
    const randIndex = Math.floor(Math.random() * (questionsArchiveLen - i - 1));
    const filteredQuestion = questions.splice(randIndex, 1);
    filteredQuestions.push(filteredQuestion[0]);
  }
  questions = [...filteredQuestions];
};
