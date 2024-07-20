// task.js
class Task {
    constructor(text, priority) {
      this.text = text;
      this.completed = false;
      this.priority = priority;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  
  // taskList.js
  class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    deleteTask(task) {
      this.tasks = this.tasks.filter((t) => t !== task);
    }
  
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.completed);
    }
  
    toggleAllTasks() {
      this.tasks.forEach((task) => task.toggleCompleted());
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  
  // app.js
  const taskList = new TaskList();
  
  document.getElementById('add-task-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const newTaskText = document.getElementById('new-task').value.trim();
    const priority = document.getElementById('priority').value;
    if (newTaskText) {
      const task = new Task(newTaskText, priority);
      taskList.addTask(task);
      document.getElementById('new-task').value = '';
      renderTaskList();
    }
  });
  
  document.getElementById('clear-completed-btn').addEventListener('click', () => {
    taskList.clearCompletedTasks();
    renderTaskList();
  });
  
  document.getElementById('toggle-all-btn').addEventListener('click', () => {
    taskList.toggleAllTasks();
    renderTaskList();
  });
  
  function renderTaskList() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';
    taskList.getTasks().forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.className = 'task';
      taskElement.textContent = task.text;
      if (task.completed) {
        taskElement.className += ' completed';
      }
      if (task.priority === 'low') {
        taskElement.className += ' priority-low';
      } else if (task.priority === 'medium') {
        taskElement.className += ' priority-medium';
      } else if (task.priority === 'high') {
        taskElement.className += ' priority-high';
      }
      taskListElement.appendChild(taskElement);
      taskElement.addEventListener('dblclick', () => {
        editTask(taskElement, task);
      });
      taskElement.addEventListener('click', () => {
        task.toggleCompleted();
        renderTaskList();
      });
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        taskList.deleteTask(task);
        renderTaskList();
      });
      taskElement.appendChild(deleteButton);
    });
  }
  
  function editTask(taskElement, task) {
    const editText = prompt('Edit task:', task.text);
    if (editText) {
      task.text = editText;
      renderTaskList();
    }
  }
  
  renderTaskList();