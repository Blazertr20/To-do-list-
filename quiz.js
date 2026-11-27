let question = [];
const timerDisplay = document.getElementById("timer-display");
const progressBar = document.getElementById("progress-bar");

let timerInterval;
let secondsElapsed = 0;


// quiz maker stuff
const creatorDiv = document.getElementById("quiz-creator");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizDiv = document.getElementById("quiz-container");
const addBtn = document.getElementById("add-question-btn");
const startBtn = document.getElementById("start-custom-quiz-btn");
const questionList = document.getElementById("question-list");
const saveBtn = document.getElementById("save-quiz-btn");
const savedQuizzesList = document.getElementById("saved-quizzes-list");
const quizTitleInput = document.getElementById("quiz-title-input");
const quizHeader = document.querySelector(".app h1");

const resultsContainer = document.getElementById("results-container");
const resultsScore = document.getElementById("results-score");
const resultsSub = document.getElementById("results-sub");
const resultsList = document.getElementById("results-list");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startTimer () {
    secondsElapsed = 0;
    timerDisplay.innerText = `Time: 0s`;
    timerDisplay.style.display = "block";

    timerInterval = setInterval(() => {
        secondsElapsed++;
        timerDisplay.innerText = `Time: ${secondsElapsed}s`;
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
    timerDisplay.style.display = "none";
}


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsContainer.style.display = "none";
    resultsList.innerHTML ="";
    questionElement.style.display = "block";
    nextButton.innerHTML = "Next";
    startTimer();
    showQuestion();

}


function showQuestion(){
    resetState();

    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    const progressPercentage = (questionNo/ question.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const shuffleAnswers = shuffleArray([...currentQuestion.answers]);

    shuffleAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}




function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    userAnswers.push({
        selectedText: selectedBtn.innerText,
        wasCorrect: isCorrect,
        correctText: [...answerButtons.children].find(b => b.dataset.correct === "true").innerText
    });

    const feedback = document.createElement("div");

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        feedback.innerText = "✅ Correct!";
        feedback.classList.add("feedback-popup", "correct-feedback");

    }else{
        selectedBtn.classList.add("incorrect");
        feedback.innerText = "❌ Incorrect!";
        feedback.classList.add("feedback-popup", "incorrect-feedback");
    }


    document.body.appendChild(feedback);

    setTimeout(() =>{
        feedback.remove();
    }, 1200
    );

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
      stopTimer();
    resetState();

    const percent = Math.round((score / question.length) * 100);
    resultsScore.textContent = `You scored ${score} / ${question.length}`;
    resultsSub.textContent = `${percent}% . ${secondsElapsed} seconds`;

    resultsList.innerHTML = "";
    const template = document.getElementById("result-row-template");

    question.forEach((q,i) => {
        const picked = userAnswers[i];
        const row = template.content.cloneNode(true);
        const rowEl = row.querySelector(".result-row");
        const questionEl = row.querySelector(".result-question");
        const pickedEl = row.querySelector(".picked");
        const correctEl = row.querySelector(".correct-answer");

        questionEl.textContent = `${picked.wasCorrect ? "✅" : "❌" } ${i + 1}. ${q.question}`;
        pickedEl.textContent = "Your answer: " + picked.selectedText;

        if(picked.wasCorrect) {
            rowEl.classList.add("result-correct");
            correctEl.remove();
        } else {
            rowEl.classList.add("result-incorrect");
            correctEl.textContent = "Correct: " + picked.correctText;
        }

        resultsList.appendChild(row);

    });

    questionElement.style.display = "none";
    resultsContainer.style.display = "block";
    nextButton.innerHTML = "Create New Quiz";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();

    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if (nextButton.innerHTML === "Create New Quiz"){
        //when quiz is over then next question
        timerDisplay.style.display = "none";
        progressBar.style.width = "0%"
        quizDiv.style.display = "none";
        creatorDiv.style.display = "block";//clear questions

        resultsContainer.style.display = "none";
        resultsList.innerHTML ="";
        questionElement.style.display = "block";

        document.getElementById("sprite-container").classList.remove("quiz-mode")
        quizHeader.innerText = "Simple Quiz";

    }else{
        //next question
        handleNextButton();
    }
});

//update question list
function updateQuestionList(){
    questionList.innerHTML = "";

    question.forEach((q, index) => {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
       textSpan.textContent = `${index + 1}. ${q.question}`;
       li.appendChild(textSpan);

       // question delete btn
       const deleteBtn = document.createElement("button");
       deleteBtn.innerHTML = "X";
       deleteBtn.classList.add("delete-btn");

       deleteBtn.addEventListener("click", () => {
        question.splice(index, 1);
        updateQuestionList();
       });

       li.appendChild(deleteBtn);
       questionList.appendChild(li);
    });
}

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById("new-question").addEventListener("keydown", e => {
    if (e.key === "Enter") addBtn.click();
});

document.querySelector("#question-list").insertAdjacentHTML("beforebegin",
    `<p id="question-count"> 0 questions </p>`);

addBtn.addEventListener("click", () => {
    const qText = document.getElementById("new-question").value.trim();
    const answerInputs = document.querySelectorAll(".answer-input");
    const correctIndex = parseInt(document.getElementById ("correct-answer").value);

    if (!qText) {alert ("Please enter a question!"); return; }
    let answers = [];
    let allFilled = true;

    answerInputs.forEach((input, index) => {
        const text = input.value.trim();
        if(!text) allFilled = false;
        answers.push({ text: text, correct: index === correctIndex });
    });
    if(!allFilled) {alert ("Please fill in all 4 answers!"); return;}

    question.push({question: qText, answers: answers});

    document.getElementById("new-question").value = "";
    answerInputs.forEach(input => input.value = "");

    updateQuestionList();

    });


startBtn.addEventListener("click", () => {
   
   if(question.length === 0){
    alert("Please add at least one question first!");
    return;
   }
   
   creatorDiv.style.display = "none";
   quizDiv.style.display = "block";

   const customTitle = quizTitleInput.value.trim();
   if (customTitle) {
    quizHeader.innerText = customTitle;

   } else {
    quizHeader.innerText = "Simple Quiz";
   }

    document.getElementById("sprite-container").classList.add("quiz-mode");

    shuffleArray(question);

   startQuiz();
});

function renderSavedQuizzes(){
    savedQuizzesList.innerHTML = "";
    let savedQuizzes = JSON.parse(localStorage.getItem("myQuizzes")) || [];

    //loop if there is a quiz

    if (savedQuizzes.length > 0) {
        savedQuizzes.forEach(quiz => {
            const li = document.createElement("li");

            const titleSpan = document.createElement("span");
            titleSpan.textContent = quiz.title;
            li.appendChild(titleSpan);

            const btnContainer = document.createElement("div");

            const loadBtn = document.createElement("button");
            loadBtn.innerText = "Load";
            loadBtn.classList.add("load-btn");
            loadBtn.onclick = () => loadQuiz(quiz);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "X";
            deleteBtn.classList.add("delete-saved-btn");
            deleteBtn.onclick = () => deleteSavedQuiz(quiz.id);

            btnContainer.appendChild(loadBtn);
            btnContainer.appendChild(deleteBtn);
            li.appendChild(btnContainer);

            savedQuizzesList.appendChild(li);
        });
    }
    
}

function loadQuiz(quizObj){
    question = [...quizObj.questions];
    quizTitleInput.value = quizObj.title;
    updateQuestionList();
    alert(`Loaded "${quizObj.title}" Take this quiz or edit it`);
}

function deleteSavedQuiz(id) {
    if(!confirm("Are you sure you want to delete")) return;

    let savedQuizzes = JSON.parse(localStorage.getItem("myQuizzes")) || [];
    savedQuizzes = savedQuizzes.filter(q => q.id !== id);

    localStorage.setItem("myQuizzes", JSON.stringify(savedQuizzes));
    renderSavedQuizzes();
}

saveBtn.addEventListener("click", () => {
    if (question.length === 0) {
        alert("You nedd to at least add one question before you save");
        return;
    }

    const title = quizTitleInput.value.trim() || "Untitled Quiz";

    let savedQuizzes = JSON.parse(localStorage.getItem("myQuizzes")) || [];

    savedQuizzes.push({
        id: Date.now(),
        title: title,
        questions: question
    });

    localStorage.setItem("myQuizzes", JSON.stringify(savedQuizzes));

    alert(`"${title}" has been saved!`);
    renderSavedQuizzes();
});

renderSavedQuizzes();













