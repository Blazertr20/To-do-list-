let question = [];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


// quiz maker stuff
const creatorDiv = document.getElementById("quiz-creator");
const quizDiv = document.getElementById("quiz-container");
const addBtn = document.getElementById("add-question-btn");
const startBtn = document.getElementById("start-custom-quiz-btn");
const questionList = document.getElementById("question-list");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();

    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
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
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
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
        quizDiv.style.display = "none";
        creatorDiv.style.display = "block";//clear questions
        question = [];
        updateQuestionList();
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
        li.textContent = `${index + 1}. ${q.question}`;
        questionList.appendChild(li);
    });
}


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

   startQuiz();
});

















