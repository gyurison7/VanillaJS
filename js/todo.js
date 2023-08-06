const toDoForm = document.getElementById('todo-form');
const toDoinput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'toDos';
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handelDeleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((item) => item.id !== Number(li.id));
    saveToDos();
}

function paintTodo(newToDoObj) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.id = newToDoObj.id;

    span.innerText = newToDoObj.text;
    li.appendChild(span);
    button.innerText = 'X';
    button.className = "delete-btn"; // 클래스 추가
    li.appendChild(button);
    button.addEventListener('click', handelDeleteTodo);
    toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
    e.preventDefault();
    const newToDo = toDoinput.value;
    toDoinput.value = '';

    const newToDoObj = {
        id: Date.now(),
        text: newToDo,
    }
    toDos.push(newToDoObj);
    paintTodo(newToDoObj);
    saveToDos();
}


toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; // 로컬스토리지에 저장된 이전 todos 가져오기
    parsedToDos.forEach(paintTodo);

}