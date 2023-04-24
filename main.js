// Get Elements From Html

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// check if there is data in local storage 

if(localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorage();

submit.onclick = function () {
  if(input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  } else {
    swal({
      title: "Warrning",
      text: "You should write your task !!",
      icon: "error",
    });
  }
};

// Event To Delete Task On Click

tasksDiv.addEventListener("click", (e) => {

  if(e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    
    e.target.parentElement.remove();
    tasksDiv.style.border = '0';
  }
  if(e.target.classList.contains("task")) {
    
    tasktoggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});


function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    complate: false,
  };
  // Push Task data to array of tasks variable
  arrayOfTasks.push(task);
  // add array of tasks variable with task data to addelements function to show data in The Page
  addElements(arrayOfTasks);
  // add the data to local storage for save it
  addToLocalStorage(arrayOfTasks);
}

function addElements(arrayOfTasks) {
  // Empty tasksDiv
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    // Create Task Div and CLass Name
    let divOfTask = document.createElement("div"); // Create Task Div
    divOfTask.className = "task"; // create class Name For Task Div
    tasksDiv.style.border = '1px solid #57ffc9a1';
    // check if task is done
    if(task.complate) {
      divOfTask.className = "task done";
    }
    divOfTask.setAttribute("data-id", task.id); // Create data atrribute (id for task)
    divOfTask.appendChild(document.createTextNode(task.title)); // create name of task (task.title)
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // append delete button to task div
    divOfTask.appendChild(span);
    // append task to main div (tasks div)
    tasksDiv.appendChild(divOfTask);
  });
}

function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if(data) {
    let task = JSON.parse(data);
    addElements(task);
  }
}

function deleteTask(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addToLocalStorage(arrayOfTasks);
}

function deleteAll() {
  tasksDiv.innerHTML = "";
  tasksDiv.style.border = '0';
  window.localStorage.clear();
}

let delAllBtn = document.querySelector(".form button");
delAllBtn.addEventListener("click", () => {
  deleteAll();
  window.location.reload();
})




function tasktoggleStatus(taskId) {

  for(let i = 0; i < arrayOfTasks.length; i++) {
    if(arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].complate == false ? (arrayOfTasks[i].complate = true) : (arrayOfTasks[i].complate = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
}

