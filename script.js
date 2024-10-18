const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || []; 
let id = todos.length ? todos[todos.length - 1].id + 1 : 100; 
render();

function newTodo() {
  let text = prompt('Enter todo');
  if (!text) return; 
  let todo = { id: id++, text, checked: false };
  todos.push(todo);
  saveTodos();
  render();
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join("");
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function renderTodo({ id, text, checked }) {
  return `
  <li class="list-group-item">
    <input type="checkbox" class="form-check-input me-2" id="${id}" ${checked ? "checked" : ""} onchange="changeTodo(${id})"/>
    <label for="${id}"><span>${text}</span></label>
    <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${id})">Delete</button>
  </li>
  `;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

function changeTodo(id) {
  for (let todo of todos) {
    if (todo.id === id) {
      todo.checked = !todo.checked;
      break;
    }
  }
  saveTodos();
  render();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
