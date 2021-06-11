const DELETE_BTN_CLASS = 'delete-btn';
const TODO_ITEM_SELECTOR = '.todo-item';
const TODO_ITEM_CLASS = 'todo-item';
const DONE_TOGGLE_CLASS = 'done';
const TODO_ID_ATTRIBUTE = 'data-todo-id';

const template = document.getElementById('newTodoTemlate').innerHTML;
const listEl = document.getElementById('list');
const newTaskInputEl = document.getElementById('newTaskInput');

let todoList = [];

document.getElementById('addTodobtn')
        .addEventListener('click', onAddTodoBtnClick)

listEl.addEventListener('click', onListElementClick)

init();

function onAddTodoBtnClick() {
    if (isInputValid()) {
        const newTodo = getFormData();
        addTodo(newTodo);
        resetForm();
    }
}

function onListElementClick(e) {
    if (e.target.classList.contains(TODO_ITEM_CLASS)) {
        toggleListElement(e.target);
    } 
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const todoId = getTodoId(e.target);

        deleteTodo(todoId);
    }
}

function init() {
    restoreFromStorage();
    renderTodoSecond(todoList);
}

function getTodoId(el) {
    const row = el.closest(TODO_ITEM_SELECTOR);
    return +row.dataset.todoId;
}

function getTodoRow(id) {
    return listEl.querySelector(`[${TODO_ID_ATTRIBUTE}="${id}"]`)
}

function toggleListElement(el) {
    // console.log(el)
    el.classList.toggle(DONE_TOGGLE_CLASS);
}

function deleteTodo(id) {
    todoList = todoList.filter((item) => item.id !== id);
    saveToStorage();
    renderTodoSecond(todoList);
    // removeTodoElement(id);
}

function removeTodoElement(id) {
    const el = getTodoRow(id);

    el.remove();
}

function isInputValid () {
    return !isEmpty(newTaskInputEl.value);
}

function isEmpty(str) {
    return str.trim() === '';
}

function addTodo(todo) {
    todoList.push(todo);
    saveToStorage();
    renderTodoSecond(todoList);
    // renderTodo(todo);
}

function renderTodoSecond(list) {
    listEl.innerHTML = '';
    list.forEach((item) => renderTodo(item));
}

function renderTodo(todo) {
    const newTodoHtml = getTodoRowHtml(todo);

    listEl.insertAdjacentHTML('beforeend', newTodoHtml);

    const insertedEl = listEl.children[listEl.children.length -1];

}

function getTodoRowHtml(todo) {
    return template.replace('{{id}}', todo.id)
                    .replace('{{content}}', todo.content);
}

function getFormData() {
    return {
        id: Date.now(),
        content: newTaskInputEl.value
    };
}
  

function resetForm() {
    newTaskInputEl.value = '';
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

function restoreFromStorage() {
    const data = localStorage.getItem('todoList');
    if (data !== null) {
        todoList = JSON.parse(data);
    } else {
        todoList = [];
    }
}



