// ------------------- ELEMENT SELECTION -------------------
// Select input field, list container, buttons
const taskInput = document.getElementById("taskInput");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const selectAllBtn = document.getElementById("select-all-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Array to hold to-do items
let todos = [];

// ------------------- LOAD SAVED TASKS -------------------
// Load tasks from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  renderTodos(); // Render tasks on page
});

// ------------------- ADD NEW TASK -------------------
// Add button click
addBtn.addEventListener("click", addTask);

// Enter key press
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    const newTask = {
      id: Date.now(), // Unique ID
      text: text,
      completed: false, // Not done yet
    };
    todos.push(newTask); // Add to array
    taskInput.value = ""; // Clear input
    saveAndRender(); // Save to storage and update UI
  }
}

// ------------------- CONTROL BUTTONS -------------------
// Select All tasks
selectAllBtn.addEventListener("click", () => {
  todos = todos.map((task) => ({ ...task, completed: true }));
  saveAndRender();
});

// Delete All tasks
deleteAllBtn.addEventListener("click", () => {
  todos = [];
  saveAndRender();
});

// ------------------- HANDLE INDIVIDUAL TASKS -------------------
// Listen for checkbox toggle or delete button click
list.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  // Toggle completion
  if (e.target.classList.contains("checkbox")) {
    todos = todos.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
  } 
  // Delete individual task
  else if (e.target.classList.contains("deleteBtn")) {
    todos = todos.filter((task) => task.id !== id);
    saveAndRender();
  }
});

// ------------------- RENDER TASKS -------------------
// Function to display all tasks in the list
function renderTodos() {
  list.innerHTML = ""; // Clear existing tasks

  todos.forEach((task) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "10px";
    li.classList.toggle("completed", task.completed);

    // Checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;
    checkbox.classList.add("checkbox");
    checkbox.style.width = "20px";
    checkbox.style.height = "20px";
    checkbox.style.accentColor = "green";
    checkbox.style.cursor = "pointer";

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.textDecoration = task.completed ? "line-through" : "none";
    span.style.color = task.completed ? "#999" : "#000";
    span.style.fontSize = "1.2em";
    span.style.marginLeft = "10px";
    span.style.flex = "1";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = task.id;
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.style.backgroundColor = "#f44336";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "8px";
    deleteBtn.style.padding = "5px 12px";
    deleteBtn.style.cursor = "pointer";

    // Hover effect for delete button
    deleteBtn.addEventListener("mouseover", () => {
      deleteBtn.style.backgroundColor = "#d32f2f";
    });
    deleteBtn.addEventListener("mouseout", () => {
      deleteBtn.style.backgroundColor = "#f44336";
    });

    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ------------------- SAVE AND RENDER -------------------
// Save tasks to localStorage and update UI
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}