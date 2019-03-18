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
      question: "Which of the following is correct?",
      answers: {
        a: "Spectre is a hardware based vulnerability, but Meltdown is not",
        b: "Both Spectre and Meltdown are hardware based vulnerabilities",
        c: "Spectre is a software based vulnerability, but Meltdown is not",
        d: "Both Spectre and Meltdown are software based vulnerabilities"
      },
      correctAnswer: "b"
    },
    {
      question: "What causes the Spectre vulnerability?",
      answers: {
        a: "out-of-order execution in the kernel",
        b: "branch prediction from microprocessors",
        c: "use of speculative execution",
        d: "a and b",
        e: "b and c",
        f: "a and c"
      },
      correctAnswer: "e"
    },
    {
      question: "What causes the Meltdown vulnerabilty?",
      answers: {
        a: "out-of-order execution in the kernel",
        b: "branch prediction from microprocessors",
        c: "use of speculative execution",
        d: "a and b",
        e: "b and c",
        f: "a and c"
      },
      correctAnswer: "a"
    },
    {
      question: "Which brand of processor had the most issues with the Meltdown/Spectre vulnerabilties?",
      answers: {
        a: "AMD",
        b: "ARM",
        c: "Intel",
        d: "Trick question, all were affected equally"
      },
      correctAnswer: "c"
    },
    {
      question: "There is only one version of Spectre and one version of Meltdown",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "b"
    },
    {
      question: "Traces of the Meltdown/Spectre attack can be found in traditional log files",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "b"
    },
    {
      question: "Intel has supposedly added hardware and firmware mitigations regarding Spectre and Meltdown vulnerabilities to its latest processors.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    }
  ];

  // displays quiz
  buildQuiz();

  // shows results
  submitButton.addEventListener("click", showResults);
})();
