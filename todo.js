
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Let's get productive! Go ahead and write something!!");
    return;
  }
  //no empty task 

  let li = document.createElement("li");
  li.textContent = inputBox.value.trim();
  let span = document.createElement("span");
  span.textContent = "\u00d7";
  li.appendChild(span);
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();                        // order messed up + save data fixed
}


listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});      // saves after each time website is entire on the same device browser


function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

//JSON is better but for now i ain't doing allat T_T

function showTask() {
  const saved = localStorage.getItem("data");
  if (saved) listContainer.innerHTML = saved;
}


showTask();


// removed the error thing cux i'm not putting grammer checking or spell check on this anymore