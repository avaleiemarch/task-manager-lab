// Get HTML elements
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

// Store all tasks in an array
let tasks = [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        tasks = [];
    }
}

// Display all tasks on the webpage
function renderTasks() {
    
    // Clear the task list before displaying tasks
    taskList.innerHTML = "";

    // Check if there are no tasks
    if (tasks.length == 0) {
        taskList.innerHTML = "<p>No tasks yet</p>";
        return;
    }

    // Loop through each task
    tasks.forEach(function(task) {

        // Create a div for the task
        const taskItem = document.createElement("div");

        // Add the task and priority classes
        taskItem.className = `task-item ${task.priority}`;

        // Add completed class if task is finished
        if (task.completed) {
            taskItem.classList.add("completed");
        }

        // Created a span for the task title
        const title = document.createElement("span");
        title.textContent = task.title;

        // Create a div for the buttons
        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        // Create the Complete/Undo button
        const toggleButton = document.createElement("button");
        toggleButton.className = "toggle-btn";
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.dataset.id = task.id;

        // Create the Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = task.id;

        // Add buttons to the actions div
        taskActions.appendChild(toggleButton);
        taskActions.appendChild(deleteButton);

        // Add title and buttons to the task div
        taskItem.appendChild(title);
        taskItem.appendChild(taskActions);

        // Add the task to the webpage
        taskList.appendChild(taskItem);
    });
}

// Add a new task when the form is submitted
taskForm.addEventListener("submit", function(e) {

    // Prevent the page from refreshing
    e.preventDefault();

    // Get the task title and remove extra spaces
    const title = taskTitle.value.trim();

    // Stop if the title is empty
    if (title === "") {
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(),
        title: title,
        priority: taskPriority.value,
        completed: false
    };

    // Add the task to the array
    tasks.push(newTask);

    // Save and display the updated tasks
    saveTasks();
    renderTasks();

    // Clear the form
    taskForm.reset();
});

// Handle Complete and Delete button clicks
taskList.addEventListener("click", function(event) {

    // Check which button was clicked
    const id = Number(event.target.dataset.id);

    // Complete or Undo a task
    if (event.target.classList.contains("toggle-btn")) {

        const task = tasks.find(function(task) {
            return task.id === id;
        });

        if (task) {
            task.completed = !task.completed;
        }
    }

    // Delete a task
    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function(task) {
            return task.id == id;
        });
    }

    // Save and display updated tasks
    saveTasks();
    renderTasks();
});


// Load and display saved tasks when the page opens
loadTasks();
renderTasks();