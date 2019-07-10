// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear tasks event
    clearBtn.addEventListener('click',clearTasks);

    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create a list element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node & append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-times"></i>';

        li.appendChild(link);

        // Append li to ul collection
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }else{
        // Create a list element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node & append to li
        li.appendChild(document.createTextNode(taskInput.value));

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-times"></i>';

        li.appendChild(link);

        // Append li to ul collection
        taskList.appendChild(li);

        // Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = '';

        e.preventDefault();
    }    
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.parentElement.classList.contains('collection-item')){
        e.target.parentElement.parentElement.remove();
    }

    // Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from local storage
    clearTasksFromLocalStorage();

    e.preventDefault();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}