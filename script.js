const taskInput = document.getElementById("texto-tarefa");
const btnAddTask = document.getElementById("criar-tarefa");
const taskList = document.getElementById("lista-tarefas");
const btnClear = document.querySelector("#apaga-tudo");
const btnClearCompleted = document.querySelector("#remover-finalizados");
const btnSaveTasks = document.querySelector("#salvar-tarefas");
const btnMoveUp = document.querySelector("#mover-cima");
const btnMoveDown = document.querySelector("#mover-baixo");
const btnRemoveTask = document.querySelector("#remover-selecionado");

function capitalizeFirstLetter() {
  return taskInput.value.charAt(0).toUpperCase() + taskInput.value.slice(1);
}

function removeSelectedTask() {
  const selectedTask = document.querySelector("#selected");
  if (selectedTask != null) {
    btnRemoveTask.addEventListener("click", function () {
      selectedTask.remove();
    });
  }
}

function selectTask(event) {
  for (let i = 0; i < taskList.children.length; i += 1) {
    taskList.children[i].removeAttribute("id");
  }
  const task = event.target;
  task.id = 'selected';
  removeSelectedTask();
}

function createTask() {
  btnAddTask.addEventListener("click", function () {
    if (taskInput.value.trim().length === 0) {
      alert("Insira uma tarefa.");
    } else {
      const newListItem = document.createElement("li");
      newListItem.innerText = capitalizeFirstLetter();
      newListItem.addEventListener("click", selectTask);
      newListItem.addEventListener("dblclick", function (event) {
        event.target.classList.toggle("completed");
      });
      taskList.appendChild(newListItem);
    }
    taskInput.value = "";
  });
}

function clearTasks() {
  btnClear.addEventListener("click", function () {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Me ajudou: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    localStorage.removeItem("tasks");
  });
}

function clearCompleted() {
  btnClearCompleted.addEventListener("click", function () {
    const taskCompleted = document.querySelectorAll(".completed");
    for (let i = 0; i < taskCompleted.length; i += 1) {
      taskCompleted[i].remove();
    }
  });
}

function saveTasks() {
  for (let i = 0; i < taskList.children.length; i += 1) {
    taskList.children[i].removeAttribute("id");
  }
  btnSaveTasks.addEventListener("click", function () {
    localStorage.setItem("tasks", taskList.innerHTML);
  });
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks");
  for (let i = 0; i < taskList.children.length; i += 1) {
    const task = taskList.children[i];
    task.addEventListener("click", selectTask);
    task.addEventListener("dblclick", function (event) {
      event.target.classList.toggle("completed");
    });
  }
}

// Nas funções moveUp e moveDown consultei os seguintes links para me ajudar:
// https://iqcode.com/code/javascript/move-list-items-up-and-down-using-javascript
// https://www.w3schools.com/jsref/met_node_insertbefore.asp
// E também consultei o projeto de um colega para apenas procurar entender melhor como montar a condição: Elias Ferreira.
function moveUp() {
  btnMoveUp.addEventListener("click", function () {
    const selectedTask = document.querySelector("#selected");
    if (selectedTask && selectedTask.previousElementSibling) {
      taskList.insertBefore(selectedTask, selectedTask.previousElementSibling);
    }
  });
}

function moveDown() {
  btnMoveDown.addEventListener("click", function () {
    const selectedTask = document.querySelector("#selected");
    if (selectedTask && selectedTask.nextElementSibling) {
      taskList.insertBefore(selectedTask.nextElementSibling, selectedTask);
    }
  });
}

window.onload = function () {
  loadTasks();
  createTask();
  clearTasks();
  clearCompleted();
  saveTasks();
  moveUp();
  moveDown();
};
