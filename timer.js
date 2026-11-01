
// basic controls
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

//the dif modes
const focusBtn = document.getElementById("focus-mode")
const breakBtn = document.getElementById("break-mode")

//spider
const spider = document.getElementById("spider");


const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let currentMode = "focus";

let timeLeft = FOCUS_TIME;
let interval= null;

const updateTimer = ( ) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    

    timer.innerHTML =
     `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;


}

const startTimer = () => {
  if (interval) return;           // don't start twice pls

  spider.classList.add("running");
  
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(interval);
      interval = null;
      
      spider.classList.remove("running");

    if (currentMode === "focus"){
      alert("focus time is over! Break time now.");
      switchMode("break");

    } else{
      alert("Break's done, Time to lock in!!!");
      switchMode("focus");
    }

     timeLeft = currentMode === "focus" ? FOCUS_TIME : BREAK_TIME;
    updateTimer();
    }
   
  }, 1000);
}; 


const stopTimer = () => {
  clearInterval(interval);
  interval = null;

  //stops imole during pause
  spider.classList.remove("running");
  
};

const resetTimer = () => {
  clearInterval(interval);
  interval = null;
  timeLeft = currentMode === "focus" ? FOCUS_TIME : BREAK_TIME;
  updateTimer();

  //stops imole when modes r reset
spider.classList.remove("running");
};

const switchMode = (mode) =>{
  clearInterval(interval)
  interval = null;
  currentMode = mode;

//stops imole when modes r switched
  spider.classList.remove("running");


  if (mode === "focus"){
    timeLeft = FOCUS_TIME;
    focusBtn.classList.add("active");
    breakBtn.classList.remove("active");
  } else {
    timeLeft = BREAK_TIME;
    breakBtn.classList.add("active");
    focusBtn.classList.remove("active");

  }
   updateTimer();
};


start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
 reset.addEventListener("click", resetTimer);
 focusBtn.addEventListener("click", () => switchMode ("focus"));
 breakBtn.addEventListener("click", () => switchMode ("break"));

 updateTimer();