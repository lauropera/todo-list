const taskInput = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');
const selectedTask = document.querySelector('#selected');

function capitalizeFirstLetter() {
  return taskInput.value.charAt(0).toUpperCase() + taskInput.value.slice(1);
}

function removeSelectedTask() {
  const btnRemoveTask = document.querySelector('#remover-selecionado');
  const selectedTask = document.querySelector('#selected');
  if (selectedTask !== null) {
    btnRemoveTask.addEventListener('click', () => {
      selectedTask.remove();
    });
  }
}

function selectTask(event) {
  taskList.childNodes.forEach((task) => task.removeAttribute('id'));
  event.target.id = 'selected';
  removeSelectedTask();
}

function createTask() {
  const btnAddTask = document.getElementById('criar-tarefa');
  btnAddTask.addEventListener('click', () => {
    if (taskInput.value.trim().length === 0) {
      alert('Insira uma tarefa.');
    } else {
      const newListItem = document.createElement('li');
      newListItem.innerText = capitalizeFirstLetter();
      newListItem.addEventListener('click', selectTask);
      newListItem.addEventListener('dblclick', (event) => {
        event.target.classList.toggle('completed');
      });
      taskList.appendChild(newListItem);
    }
    taskInput.value = '';
  });
}

function clearTasks() {
  const btnClear = document.querySelector('#apaga-tudo');
  btnClear.addEventListener('click', () => {
    while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
    localStorage.removeItem('tasks');
  });
}

function clearCompleted() {
  const btnClearCompleted = document.querySelector('#remover-finalizados');
  const taskCompleted = document.querySelectorAll('.completed');
  btnClearCompleted.addEventListener('click', () => {
    taskCompleted.forEach((task) => task.remove())
  });
}

function saveTasks() {
  const btnSaveTasks = document.querySelector('#salvar-tarefas');
  taskList.childNodes.forEach((task) => task.removeAttribute('id'))
  btnSaveTasks.addEventListener('click', () => {
    localStorage.setItem('tasks', taskList.innerHTML);
  });
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem('tasks');
  taskList.childNodes.forEach((task) => {
    task.addEventListener('click', selectTask);
    task.addEventListener('dblclick', (event) => {
      event.target.classList.toggle('completed');
  });
})
}

function moveUp() {
  const btnMoveUp = document.querySelector('#mover-cima');
  btnMoveUp.addEventListener('click', () => {
    if (selectedTask && selectedTask.previousElementSibling) {
      taskList.insertBefore(selectedTask, selectedTask.previousElementSibling);
    }
  });
}

function moveDown() {
  const btnMoveDown = document.querySelector('#mover-baixo');
  btnMoveDown.addEventListener('click', () => {
    if (selectedTask && selectedTask.nextElementSibling) {
      taskList.insertBefore(selectedTask.nextElementSibling, selectedTask);
    }
  });
}

window.onload = () => {
  loadTasks();
  createTask();
  clearTasks();
  clearCompleted();
  saveTasks();
  moveUp();
  moveDown();
};
