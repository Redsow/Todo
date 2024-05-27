document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const taskCounter = document.getElementById('taskCounter');
    const doneCounter = document.getElementById('doneCounter');

    function updateCounters() {
        const taskCount = taskList.querySelectorAll('li').length;
        const doneCount = completedTaskList.querySelectorAll('li').length;
        taskCounter.textContent = taskCount;
        doneCounter.textContent = doneCount;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed, task.done));
        updateCounters();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li, #completedTaskList li').forEach(li => {
            const span = li.querySelector('span');
            tasks.push({
                text: span.textContent,
                completed: li.parentElement.id === 'completedTaskList',
                done: li.parentElement.id === 'completedTaskList'
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateCounters();
    }

    function addTaskToDOM(taskText, completed = false, done = false) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const span = document.createElement('span');
        span.textContent = taskText;
        if (completed) {
            span.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6112 4.125H3.48622C3.30388 4.125 3.12902 4.19743 3.00009 4.32636C2.87115 4.4553 2.79872 4.63016 2.79872 4.8125C2.79872 4.99484 2.87115 5.1697 3.00009 5.29864C3.12902 5.42757 3.30388 5.5 3.48622 5.5H4.17372V17.875C4.17372 18.2397 4.31859 18.5894 4.57645 18.8473C4.83431 19.1051 5.18405 19.25 5.54872 19.25H16.5487C16.9134 19.25 17.2631 19.1051 17.521 18.8473C17.7789 18.5894 17.9237 18.2397 17.9237 17.875V5.5H18.6112C18.7936 5.5 18.9684 5.42757 19.0974 5.29864C19.2263 5.1697 19.2987 4.99484 19.2987 4.8125C19.2987 4.63016 19.2263 4.4553 19.0974 4.32636C18.9684 4.19743 18.7936 4.125 18.6112 4.125ZM16.5487 17.875H5.54872V5.5H16.5487V17.875ZM6.92372 2.0625C6.92372 1.88016 6.99615 1.7053 7.12509 1.57636C7.25402 1.44743 7.42888 1.375 7.61122 1.375H14.4862C14.6686 1.375 14.8434 1.44743 14.9724 1.57636C15.1013 1.7053 15.1737 1.88016 15.1737 2.0625C15.1737 2.24484 15.1013 2.4197 14.9724 2.54864C14.8434 2.67757 14.6686 2.75 14.4862 2.75H7.61122C7.42888 2.75 7.25402 2.67757 7.12509 2.54864C6.99615 2.4197 6.92372 2.24484 6.92372 2.0625Z" fill="#9E78CF"/></svg>';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            li.parentElement.removeChild(li);
            saveTasks();
        });

        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7851 6.67391L8.78513 17.6739C8.72128 17.7378 8.64546 17.7885 8.56199 17.8231C8.47853 17.8577 8.38907 17.8755 8.29872 17.8755C8.20837 17.8755 8.11891 17.8577 8.03545 17.8231C7.95199 17.7885 7.87617 17.7378 7.81232 17.6739L2.99982 12.8614C2.87081 12.7324 2.79834 12.5574 2.79834 12.375C2.79834 12.1926 2.87081 12.0176 2.99982 11.8886C3.12882 11.7596 3.30378 11.6871 3.48622 11.6871C3.66866 11.6871 3.84363 11.7596 3.97263 11.8886L8.29872 16.2155L18.8123 5.70109C18.9413 5.57209 19.1163 5.49962 19.2987 5.49962C19.4812 5.49962 19.6561 5.57209 19.7851 5.70109C19.9141 5.8301 19.9866 6.00506 19.9866 6.1875C19.9866 6.36994 19.9141 6.5449 19.7851 6.67391Z" fill="#9E78CF"/></svg>';
        doneButton.classList.add('done-btn');
        doneButton.addEventListener('click', function() {
            completedTaskList.appendChild(li);
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(doneButton);
        li.appendChild(deleteButton);

        if (done) {
            completedTaskList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }

        updateCounters();
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();
});
