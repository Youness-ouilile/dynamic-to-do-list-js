document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        if (save) {
            const task = taskInput.value.trim();
            if (task === "") {
                alert("Please enter a task.");
                return;
            }
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            taskText = taskText;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            li.remove();
            tasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }

    addButton.addEventListener('click', () => addTask('', true));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask('', true);
        }
    });

    loadTasks();
});

