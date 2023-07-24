const resetQuestions = () => {
  const body = document.getElementsByTagName("body");
  let percentuali = Math.round((correctAnswers / totalQuestions) * 100 * 10) / 10;
  let message = "";
  if (percentuali >= 60) {
    message = '<h5 class="cong">Congratulations!</h5><h5 class="pass">You passed the exam.</h5>';
  } else {
    message = `<h5 class="cong">You failed.</h5><h5 class="pass">Better luck next time!</h5>`;
  }
  body[0].innerHTML = `
  <main>
  <img src=".\\assets\\img\\epicode_logo.png" class="epicode_logo" />
  <article class="articleresults">
    <h2 class="title">Results</h2>
    <p class="summary">The summary of your answers:</p>
    <div class="inblock correct">
      <h3 class="corwro">Correct</h3>
      <h3 class="corwro percentuali">${percentuali}%</h3>
      <p>${correctAnswers}/${totalQuestions} questions</p>
    </div>
    <div class="inblock circle" style="background-image:radial-gradient(#0b113b 50%,transparent 50%),conic-gradient(#ac0088 0% ${
      100 - percentuali
    }%,#01ffff ${100 - percentuali}% 100%)";>
      ${message}
      <p class="send">
        We'll send you the certificate<br />
        in few minutes
      </p>
      <p class="email">
        Check your email (including<br />
        promotions/spam folder)
      </p>
    </div>
    <div class="inblock wrong">
      <h3 class="corwro">Wrong</h3>
      <h3 class="corwro percentuali">${100 - percentuali}%</h3>
      <p>${totalQuestions - correctAnswers}/${totalQuestions} questions</p>
    </div>
    <button type="button" class="button">RATE US</button>
  </article>
  </main>
  `;
  const rateUs = document.getElementsByClassName("button");
  rateUs[0].addEventListener("click", () => {
    window.location.href = "feedback.html";
  });
};
