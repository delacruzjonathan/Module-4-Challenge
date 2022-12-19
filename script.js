
var start = document.getElementById ("start"); 
var quiz = document.getElementById ("quiz"); 
var question = document.getElementById ("question"); 
var choiceA = document.getElementById ("A");
var  choiceB = document.getElementById ("B");
var  choiceC = document.getElementById ("C");
var counter = document.getElementById ("counter"); 
var timeGauge = document.getElementById ("timeGauge"); 
var  progress = document.getElementById ("progress"); 
var  scoreDiv = document.getElementById ("scoreContainer"); 


let questions = [
{
    question : "What is the shortcut on VS Code that creates an HTML template?",
    imgSrc : "",
    choiceA : ".",
    choiceB : "a",
    choiceC : "!",
    correct: "C"
}
,
{
    question : "Select a common repository?",
    imgSrc : "",
    choiceA : "Github",
    choiceB : "Fitpub",
    choiceC : "Zitrub",
    correct: "A"
}
,
{
    question : "Are you having fun?",
    imgSrc : "",
    choiceA : "No",
    choiceB : "No",
    choiceC : "Yes",
    correct: "C"
}

];

const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion () {
    let q = questions [runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter, 1000);
}


function renderProgress() {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex ++) {
        progress.innerHTML += "<div class= 'prog' id=" + qIndex +"></div>";
    }


}

function renderCounter() {
    if(count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count ++
    } else {
        count = 0;
    answerIsWrong();
      if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();

    } else {
        clearInterval(TIMER);
        scoreRender();

        }
    }   
}


function checkAnswer (answer) {
    if ( answer === questions[runningQuestion].correct){
    score ++;
    answerIsCorrect();
} else {

    answerIsWrong();
}

count = 0;
if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
} else {
    clearInterval(TIMER);
    scoreRender();

}
}

function answerIsCorrect () {

    document.getElementById(runningQuestion).style.backgroundColor = "0f0";

}

function answerIsWrong () {

    document.getElementById(runningQuestion).style.backgroundColor = "f00";
}


function scoreRender () {
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);

    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

}