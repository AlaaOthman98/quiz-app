/**
 * this function is mainly for bringing data from external quizQuestion.json file
 * it makes XHTTP Request to get data, and if data is brought sunccessfully it passes the response to the callback function that is passed to.
 *
 * @param {Callback function} cb, it receives the response.
 */
function fetchQuestions(cb) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      cb(JSON.parse(xhttp.response).questions);
    }
  };

  xhttp.open("GET", "quizQuestions.json", true);
  xhttp.send();
}

/**
 * this is the handler of click event associated to the Start Quiz Button
 */
function startQuizButtonClick() {
  let startQuizButton = document.getElementById("SQuiz");
  startQuizButton.setAttribute("disabled", "disabled");

  fetchQuestions(function (questions) {
    let quizDiv = document.getElementById("quizDiv");
    quizDiv.style.display = "block";
    questions.forEach((question, i) => {
      quizDiv.innerHTML += `
        <div class="quesDiv">
            <h2>Question ${i + 1}</h2>
            <p>${question.question}</p>
            <div class="choicesWrapper">
            </div>
        </div>
      `;

      let quesChoices = document.getElementsByClassName("choicesWrapper");
      question.choices.forEach((choice) => {
        quesChoices[i].innerHTML += `
            <button onclick="answerClick(${choice.correct})">${choice.answer}</button> </br>
        `;
      });
    });
  });
}

/**
 * this function is responsible for showing the status of the chosen answer
 */
function answerClick(status) {
  alert(status);
}
