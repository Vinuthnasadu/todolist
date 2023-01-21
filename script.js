let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

const todayTasksContainer = document.getElementById("today-tasks");
const futureTasksContainer = document.getElementById("future-tasks");
const completedTasksContainer = document.getElementById("completed-tasks");

function addItem(event) {
    event.preventDefault();
    const itemName = document.getElementById("item-name").value;
    const itemDate = document.getElementById("item-date").value;
    const itemPriority = document.getElementById("item-priority").value;
    const newItem = {name: itemName, date: itemDate, priority: itemPriority, completed: false};
    todoList.push(newItem);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTasks();
}

function deleteItem(event) {
    const taskCard = event.target.closest(".task-card");
    const taskIndex = taskCard.getAttribute("data-index");
    todoList.splice(taskIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTasks();
}

function completeItem(event) {
    const taskCard = event.target.closest(".task-card");
    const taskIndex = taskCard.getAttribute("data-index");
todoList[taskIndex].completed = !todoList[taskIndex].completed;
localStorage.setItem("todoList", JSON.stringify(todoList));
renderTasks();
}

function renderTasks() {
clearTasks();
const currentDate = new Date().toISOString().slice(0, 10);
todoList.forEach((task, index) => {
const taskCard = document.getElementById("task-template").content.cloneNode(true);
taskCard.querySelector(".task-name").textContent = task.name;
taskCard.querySelector(".task-date").textContent = task.date;
taskCard.querySelector(".task-priority").textContent = task.priority;
taskCard.querySelector(".delete-button").addEventListener("click", deleteItem);
taskCard.querySelector(".complete-button").addEventListener("click", completeItem);
taskCard.querySelector(".task-card").setAttribute("data-index", index);

if (task.completed) {
taskCard.querySelector(".task-card").classList.add("completed");
completedTasksContainer.appendChild(taskCard);
} else {
if (task.date === currentDate) {
todayTasksContainer.appendChild(taskCard);
} else if (task.date < currentDate) {
taskCard.querySelector(".task-card").classList.add("overdue");
futureTasksContainer.appendChild(taskCard);
} else {
futureTasksContainer.appendChild(taskCard);
}
}
});
}

function clearTasks() {
todayTasksContainer.innerHTML = "";
futureTasksContainer.innerHTML = "";
completedTasksContainer.innerHTML = "";
}

renderTasks();
