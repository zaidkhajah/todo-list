import "./styles.css"
import "./todo-styles.css"

import { format, add } from "date-fns";
import { Project, setActiveProject, getActiveProject, projects, createProjectHTMLElement } from "./projects/projects.js";
import todoCardFactory from "./todo-card-factory.js";
import Todo from "./todo.js";

const content = document.querySelector(".content");

const projectsDiv = document.getElementsByClassName("projects")[0];
let activeProjectElement;
setActiveProjectElement(projectsDiv.firstElementChild);
const projectContent = document.getElementsByClassName("project-content")[0];

const newProjectForm = document.getElementById("new-project-form");
const newTodoForm = document.getElementById("new-todo-form");


projectsDiv.addEventListener("click", event => {
    if (event.target.closest(".add-project")) {
        newProjectForm.classList.remove("hidden");
        content.classList.add("unfocus");
        return;
    }

    const projectElement = event.target.closest(".project");
    const projectHeaderElement = event.target.closest(".projects-header");

    if (activeProjectElement === (projectElement || projectHeaderElement)) return;

    if (projectElement) {
        clearProjectContent();
        setActiveProjectElement(projectElement);
        setActiveProject(projects.find( project => activeProjectElement.dataset.id === project.id ));
        projectContent.firstElementChild.firstElementChild.textContent = getActiveProject().name;
        displayProjectContent();
        return;
    }

    if (projectHeaderElement) {
        setActiveProjectElement(projectHeaderElement);
        return;
    }
});

projectContent.firstElementChild.addEventListener("click", event => {
    if (event.target.closest("button")) {
        newTodoForm.classList.remove("hidden");
        content.classList.add("unfocus");
    }
});

newProjectForm.lastElementChild.addEventListener("click", createFormHandler(addNewProject));
newTodoForm.lastElementChild.addEventListener("click", createFormHandler(addNewTodo));



function createFormHandler(addNew) {
    return function(event) {
        const targetBtn = event.target.closest("button");
        if (!targetBtn) return;
        if (targetBtn === this.firstElementChild) {
            addNew();
        };
        this.parentElement.classList.add("hidden");
        content.classList.remove("unfocus");
    }
}

function addNewProject() {
    newProjectForm.classList.add("hidden");
    const newProject = new Project(
        newProjectForm.children[1].lastElementChild.value,
        newProjectForm.children[2].lastElementChild.value,
        new Date()
    );
    projects.push(newProject);
    projectsDiv.lastElementChild.appendChild(createProjectHTMLElement(newProject));
}

function addNewTodo() {
    const todo = new Todo(createTodoInput(
        Array.from(newTodoForm.children).
        filter(element => element.className === "todo-input").
        map(element => element.value)
    ));
    getActiveProject().add(todo);
    todoCardFactory.set(todo);
    const card = todoCardFactory.createTodoCard();
    projectContent.lastElementChild.appendChild(card);
}

function createTodoInput(arr) {
    return {
        title : arr[0], project : getActiveProject(), description : arr[1], dueDate : arr[2], reminderDate : arr[3], priority : Number(arr[4])
    };
}

function setActiveProjectElement(projectElement) {
    console.log(activeProjectElement);
    if (activeProjectElement) activeProjectElement.classList.remove("active");
    activeProjectElement = projectElement;
    activeProjectElement.classList.add("active");
}

function clearProjectContent() {
    projectContent.lastElementChild.innerHTML = "";
}

function displayProjectContent() {
    getActiveProject().todoList.forEach(todo => {
        todoCardFactory.set(todo);
        projectContent.lastElementChild.appendChild(
            todoCardFactory.createTodoCard()
        );
    })
}