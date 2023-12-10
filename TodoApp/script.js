const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoItems = document.getElementById('todo-items');
const checked = document.getElementById('done');
const clearAll = document.getElementById('clear-todos');

function displayTodos() {
  const storedTodos = todosInStorage();
  storedTodos.forEach((todo) => {
    addToDom(todo);
  });
}

function addTodoOnSubmit(e) {
  e.preventDefault();

  let newTodo = todoInput.value;

  if (newTodo === '') {
    alert('Insert a Todo!');
    return;
  }

  addToDom(newTodo);

  addToLocalStorage(newTodo);

  // clear the input
  todoInput.value = '';
}

//Add  display
function addToDom(todo) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" name="todo-check" id="todo-check">
    <span>${todo}</span>
    <button class="remove-todo btn text-red">
        <i class="fa-solid fa-xmark"></i>
    </button>`;

  todoItems.appendChild(li);
  onLoad();
}

function completedTodo(e) {
  if (e.target.checked) {
    e.target.nextElementSibling.classList.add('checked');
  } else {
    e.target.nextElementSibling.classList.remove('checked');
  }
}

function removeFromDom(e) {
  if (e.target.parentElement.classList.contains('remove-todo')) {
    removeTodo(e.target.parentElement.parentElement);
  }
}

function removeTodo(todo) {
  if (confirm('Are your sure?')) {
    todo.remove();

    removeFromLocalStorage(todo);
  }
}

function clearTodos() {
  Array(todoItems).forEach((todo) => {
    todo.remove();
  });
}

function onLoad() {
  const todos = document.querySelectorAll('li');
  if (todos.length === 0) {
    clearAll.style.display = 'none';
  } else {
    clearAll.style.display = 'block';
  }
}

function addToLocalStorage(todo) {
  const storedTodos = todosInStorage();

  //Add items to storage
  storedTodos.push(todo);

  //convert back to string
  localStorage.setItem('todos', JSON.stringify(storedTodos));
}

function removeFromLocalStorage(todo) {
  let storedTodos = todosInStorage();

  storedTodos.forEach((td, index) => {
    if (td === todo.childNodes[3].textContent) {
      storedTodos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(storedTodos));
}

function todosInStorage() {
  let storedTodos;

  if (localStorage.getItem('todos') === null) {
    storedTodos = [];
  } else {
    storedTodos = JSON.parse(localStorage.getItem('todos'));
  }

  return storedTodos;
}

todoForm.addEventListener('submit', addTodoOnSubmit);
todoItems.addEventListener('change', completedTodo);
todoItems.addEventListener('click', removeFromDom);
clearAll.addEventListener('click', clearTodos);
document.addEventListener('DOMContentLoaded', displayTodos);

onLoad();
