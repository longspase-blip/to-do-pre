const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const tasksFromStorage = localStorage.getItem("to-do-tasks");
  if (tasksFromStorage) {
    return JSON.parse(tasksFromStorage);
  }
  return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;

  deleteButton.addEventListener('click', () => {
    clone.remove();
    const curTasks = getTasksFromDOM();
    saveTasks(curTasks);
  });

  duplicateButton.addEventListener('click', () => {
    const duplicateItemText = textElement.textContent;
    const duplicateItem = createItem(duplicateItemText);
    listElement.prepend(duplicateItem);
    const updatedTasks = getTasksFromDOM();
    saveTasks(updatedTasks);
  });

   editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const curTasks = getTasksFromDOM();
    saveTasks(curTasks);
  });

  return clone;
}

function getTasksFromDOM() {
const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('to-do-tasks', JSON.stringify(tasks));
}

