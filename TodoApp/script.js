const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoItems = document.getElementById('todo-items');
const checked = document.getElementById('done');
const clearAll = document.getElementById('clear-todos');

function addTodoSubmit(e) {
  e.preventDefault();

  let newTodo = todoInput.value;

  if (newTodo === '') {
    alert('Insert a Todo!');
  }

  addToDom(newTodo);

  // clear the input
  todoInput.value = '';
}

//Add  display
function addToDom(todo) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" name="todo-check" id="todo-check">
    <span>${todo}</span>
    <button class="remove-item btn text-red">
        <i class="fa-solid fa-xmark"></i>
    </button>`;

  todoItems.appendChild(li);
}

function completedTodo(e) {
  //   console.log(e.target.checked);
  if (e.target.checked) {
    e.target.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    e.target.nextElementSibling.style.textDecoration = 'none';
  }
  //   console.log(e.target.nextSibling);
}

function removeFromDom(e) {
  if (e.target.parentElement.classList.contains('remove-todo')) {
    removeTodo(e.target.parentElement.parentElement);
  }
}

function removeTodo(todo) {
  if (confirm('Are your sure?')) {
    todo.remove();
  }
}

function clearTodos() {
  Array(todoItems).forEach((todo) => {
    todo.remove();
  });
}

todoForm.addEventListener('submit', addTodoSubmit);
todoItems.addEventListener('change', completedTodo);
todoItems.addEventListener('click', removeFromDom);
clearAll.addEventListener('click', clearTodos);
