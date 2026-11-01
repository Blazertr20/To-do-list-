
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Let's get productive! Go ahead and write something!!");
    return;
  }
  
  let li = document.createElement("li");
  
  // Please don't delete the checked or task
  let textSpan = document.createElement("span");
  textSpan.textContent = inputBox.value.trim();
  li.appendChild(textSpan);
  
  let deleteBtn = document.createElement("span");
  deleteBtn.textContent = "\u00d7"; // The  x to remove stuff
  deleteBtn.className = "delete-btn"; 
  li.appendChild(deleteBtn);
  
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" || e.target.tagName === "SPAN" && !e.target.classList.contains("delete-btn")) {

    const li = e.target.closest("li");
    if (li) {
      li.classList.toggle("checked");
      saveData(); // SAVE IMMEDIATELY
    }
  } 
  //removes stuff
  else if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const saved = localStorage.getItem("data");
  if (saved) {
    listContainer.innerHTML = saved;
    listContainer.querySelectorAll("li.checked").forEach(li => li.remove(0));
    saveData();
    // after the items r checked , site deletes them. i just gave up on having the checked list items stay ,i don't know how to fix it, but i think this works
  }
}

showTask();

// T_T
// removed the error thing cux i'm not putting grammer checking or spell check on this anymore