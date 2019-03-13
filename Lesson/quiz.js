(function() {
  function buildQuiz() {
    //stores the HTML output
    const output = [];

    // for each question; arrow is an abbreviation so it returns nothing
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // store the list of answer choices
      const answers = [];

      // and for each available answer add answer button
      for (letter in currentQuestion.answers) {
        answers.push( //adds items to an array
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What is the result from: SELECT Surname WHERE Username = 'SaLy' ?",
      answers: {
        a: "Sarah",
        b: "712",
        c: "Lynn",
        d: "Pierce"
      },
      correctAnswer: "c"
    },
    {
      question: "What can an injection attack do?",
      answers: {
        a: "Create access despite no proper authorization",
        b: "Delete entries in the database",
        c: "Create entries in the database",
        d: "All of the above"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is malicious?",
      answers: {
        a: "1",
        b: "2",
        c: "3",
        d: "4"
      },
      correctAnswer: "d"
    }
  ];

  // displays quiz
  buildQuiz();

  // shows results
  submitButton.addEventListener("click", showResults);
})();
