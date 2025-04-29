import "./styles.css"
import "./todo-styles.css"

import { format, add } from "date-fns";
import { Project, setActiveProject, getActiveProject, projects, createProjectHTMLElement } from "./projects/projects.js";
import todoCardFactory from "./todo-card-factory.js";
import Todo from "./todo.js";

const projectsDiv = document.getElementsByClassName("projects")[0];
let activeProjectElement = projectsDiv.firstElementChild;
const projectContent = document.getElementsByClassName("project-content")[0];

const newProjectForm = document.getElementById("new-project-form");
const newTodoForm = document.getElementById("new-todo-form");


projectsDiv.addEventListener("click", event => {
    if (event.target.closest(".add-project")) {
        newProjectForm.classList.remove("hidden");
        return;
    }
    if (event.target.closest(".project") || event.target.closest(".projects-header")) {
        activeProjectElement.classList.remove("active");
        activeProjectElement = event.target.closest(".project") || event.target.closest(".projects-header");
        activeProjectElement.classList.add("active");
        console.log(activeProjectElement);
        if (!(activeProjectElement === projectsDiv.firstElementChild)) {
            setActiveProject(projects.find( project => activeProjectElement.dataset.id === project.id ));
            projectContent.firstElementChild.firstElementChild.textContent = getActiveProject().name;
            projectContent.lastElementChild.append(...getActiveProject().todoList);
        }
    }
});

projectContent.firstElementChild.addEventListener("click", event => {
    if (event.target.closest("button")) newTodoForm.classList.remove("hidden");
});

newProjectForm.lastElementChild.addEventListener("click", newProjectFormHandler);
newTodoForm.addEventListener("click", newTodoFormHandler);





function newProjectFormHandler(event) {
    if (event.target.closest("button") === this.firstElementChild) {
        newProjectForm.classList.add("hidden");
        const newProject = new Project(
            newProjectForm.children[1].lastElementChild.value,
            newProjectForm.children[2].lastElementChild.value,
            new Date()
        );
        projects.push(newProject);
        projectsDiv.lastElementChild.appendChild(createProjectHTMLElement(newProject));
    };
    if (event.target.closest("button") === this.lastElementChild) {
        newProjectForm.classList.add("hidden");
    }
}

function newTodoFormHandler(event) {
    const targetBtn = event.target.closest("button");
    if (!targetBtn) return;
    if (targetBtn === this.lastElementChild.firstElementChild) {
        const todo = new Todo(createTodoInput(
            Array.from(this.children).
            filter(element => element.className === "todo-input").
            map(element => element.value)
        ));
        getActiveProject().add(todo);
        todoCardFactory.set(todo);
        const card = todoCardFactory.createTodoCard();
        projectContent.lastElementChild.appendChild(card);
    }
    this.classList.add("hidden");
}


function createTodoInput(arr) {
    return {
        title : arr[0], project : getActiveProject(), description : arr[1], dueDate : arr[2], reminderDate : arr[3], priority : Number(arr[4])
    };
}