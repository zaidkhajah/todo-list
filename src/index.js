import "./styles.css"
import "./todo-styles.css"

import { format, add } from "date-fns";
import Project from "./projects/project.js";
import Projects from "./projects/projects.js";
import todoCardFactory from "./todo-card-factory.js";
import Todo from "./todo.js";

const projects = new Projects();

const content = document.querySelector(".content");

const projectsDiv = document.getElementsByClassName("projects")[0];
let activeProjectElement;

const projectContent = document.getElementsByClassName("project-content")[0];

const newProjectForm = document.getElementById("new-project-form");
const newTodoForm = document.getElementById("new-todo-form");

setProjectHeaderElementActive();

projectsDiv.addEventListener("click", projectsDivEventHandler);
projectContent.firstElementChild.addEventListener("click", event => {
    if (event.target.closest(".add-task")) {
        showAddTaskForm();
        return;
    }
    if (event.target.closest(".add-project")) {
        showAddProjectForm();
    }
});

newProjectForm.lastElementChild.addEventListener("click", createFormHandler(addNewProject));
newTodoForm.lastElementChild.addEventListener("click", createFormHandler(addNewTodo));

projects.forEach(project => projectsDiv.lastElementChild.appendChild(createProjectHTMLElement(project)));


function projectsDivEventHandler(event) {
    if (event.target.closest(".add-project")) {
        showAddProjectForm();
        return;
    }
    if (event.target.closest("button")) return;

    const projectElement = event.target.closest(".project");
    const projectHeaderElement = event.target.closest(".projects-header");
    
    if (activeProjectElement === (projectElement || projectHeaderElement)) return;

    if (projectElement) {
        projects.setActiveProject({id : projectElement.dataset.id});

        projectContent.firstElementChild.lastElementChild.textContent = "Add A Task";
        projectContent.firstElementChild.lastElementChild.className = "add-task";
        
        setActiveProjectElement(projectElement);
        clearProjectContent();

        displayProjectName();
        displayProjectContent();

        return;
    }

    if (projectHeaderElement) {
        clearProjectContent();
        setProjectHeaderElementActive();
    }

}


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
    const newProject = new Project(
        newProjectForm.children[1].lastElementChild.value,
        newProjectForm.children[2].lastElementChild.value,
        new Date()
    );
    projects.add(newProject);
    const projectElement = createProjectHTMLElement(newProject);
    projectsDiv.lastElementChild.appendChild(projectElement);
    if (activeProjectElement === projectsDiv.firstElementChild) {
        displayProjectInMainContentArea(newProject);
    }
}

function addNewTodo() {
    const todo = new Todo(createTodoInput(
        Array.from(newTodoForm.children).
        filter(element => element.className === "todo-input").
        map(element => element.value)
    ));
    projects.getActiveProject().add(todo);
    todoCardFactory.set(todo);
    const card = todoCardFactory.createTodoCard();
    projectContent.lastElementChild.appendChild(card);
}

function createTodoInput(arr) {
    return {
        title : arr[0], project : projects.getActiveProject(), description : arr[1], dueDate : arr[2], reminderDate : arr[3], priority : Number(arr[4])
    };
}

function setActiveProjectElement(projectElement) {
    if (activeProjectElement) {
        activeProjectElement.classList.remove("active");
    }
    activeProjectElement = projectElement;
    activeProjectElement.classList.add("active");
}

function clearProjectContent() {
    projectContent.lastElementChild.innerHTML = "";
}

function displayProjectName() {
    projectContent.firstElementChild.firstElementChild.textContent = projects.getActiveProject().name;
}

function displayProjectContent() {
    projects.getActiveProject().todoList.forEach(todo => {
        todoCardFactory.set(todo);
        projectContent.lastElementChild.appendChild(
            todoCardFactory.createTodoCard()
        );
    })
}

function displayProjectInMainContentArea(project) {
    const projectElement = createProjectHTMLElement(project);
    projectContent.lastElementChild.appendChild(projectElement);
}



function setProjectHeaderElementActive() {
    setActiveProjectElement(projectsDiv.firstElementChild);
    projectContent.firstElementChild.firstElementChild.textContent = "Projects";
    projectContent.firstElementChild.lastElementChild.textContent = "Add A Project";
    projectContent.firstElementChild.lastElementChild.className = "add-project";
    projects.forEach(project => displayProjectInMainContentArea(project));
    return;
}

function createProjectHTMLElement(project) {
    const [projectElement, projectName, projectColor, projectDelete] = [
        document.createElement("div"),
        document.createElement("span"),
        document.createElement("input"),
        document.createElement("button"),
    ];
    projectName.textContent = project.name;
    projectColor.type = "color";
    projectColor.value = project.color;
    projectDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    projectElement.classList.add("project");
    projectElement.dataset.id = project.id;

    projectDelete.addEventListener("click", () => {
        if (projectElement.parentElement.parentElement === projectContent) {
            const sib = Array.from(projectsDiv.lastElementChild.children).
            find(element => element.dataset.id === projectElement.dataset.id);
            sib.remove();
        }
        else if (activeProjectElement === projectsDiv.firstElementChild) {
            const sib = Array.from(projectContent.lastElementChild.children).
            find(element => element.dataset.id === projectElement.dataset.id);
            sib.remove();
        }
        projectElement.remove();
        projects.remove(project);

        if (activeProjectElement === projectElement) {
            clearProjectContent();
            setProjectHeaderElementActive();
        }
    });
    projectElement.append(projectColor, projectName, projectDelete);
    return projectElement;
}

function showAddTaskForm() {
    newTodoForm.classList.remove("hidden");
    content.classList.add("unfocus");
}

function showAddProjectForm() {
    newProjectForm.classList.remove("hidden");
    content.classList.add("unfocus");
}

function clearProjectsDiv() {
    projectsDiv.lastElementChild.innerHTML = "";
}