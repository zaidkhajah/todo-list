import "./styles.css"
import { format, add } from "date-fns";
import Project from "./projects/project.js";
import { projects, projectsList, createProjectHTMLElement } from "./projects/projects.js";
import createTodoCard from "./todo-card.js";
import Todo from "./todo.js";



const addProjectBtn = document.querySelector(".btns :first-child");
const cancelAddprojectBtn = document.querySelector(".btns :last-child");
// const form = document.querySelector("#add-project-form");

const projectsDiv = document.querySelector(".projects");
let activeProjectElement = projectsDiv.firstElementChild;
let activeProject = projects[0];
activeProjectElement.classList.add("active");

const projectTodos = document.querySelector(".project-todos");
console.log(projectTodos);
const projectName = document.querySelector(".project-content > .header > :first-child");
projectName.textContent = activeProject.name;

const addTodoBtn = document.querySelector(".project-content > .header > :last-child");
const addTodoForm = document.querySelector("#add-todo-form");

addTodoBtn.addEventListener("click", () => {
    addTodoForm.classList.remove("hidden");
})
const addTodoInputs = Array.from(document.querySelectorAll(".todo-input"));
addTodoInputs[2].value = format(add(new Date(), {days : 1}), "yyyy-MM-dd");
addTodoInputs[3].value = format(add(new Date(), {days : 2}), "yyyy-MM-dd");
addTodoInputs[4].value = "0";


addTodoForm.lastElementChild.firstElementChild.addEventListener("click", () => {
    const todo = new Todo(createTodoInput(addTodoInputs.map(item => item.value)));
    console.log(todo.priority);
    const todoCard = createTodoCard(todo);
    projectTodos.appendChild(todoCard);
    console.log(todoCard);
})

projectsDiv.addEventListener("click", event => {
    const targetDiv = event.target.closest("div");
    if (!(targetDiv === projectsDiv.lastElementChild)) {
        targetDiv.classList.add("active");
        activeProjectElement.classList.remove("active");
        activeProjectElement = targetDiv;
        if ( !(targetDiv === projectsDiv.firstElementChild) ) {
            activeProject = projects.find(project => project.id === targetDiv.dataset.id);
            projectName.textContent = activeProject.name;
            activeProject.todoList.forEach(todo => {
                const todoCard = createTodoCard(todo);
                projectTodos.appendChild(todoCard);
            })
        }
    }
    console.log(activeProject);
});
projectsDiv.firstElementChild.addEventListener("click", event => {
    if (event.target.closest(".add-project")) form.classList.toggle("hidden");
});

function createTodoInput(arr) {
    let title = arr[0];
    if (!arr[0]) title = "untitled";
    return {
        title, description : arr[1], dueDate : arr[2], reminderDate : arr[3], priority : Number(arr[4])
    };
    }

// addProjectBtn.addEventListener("click", () => {
//     const newProject = new Project(
//         form.children[1].value, 
//         form.children[2].lastElementChild.value,
//         new Date()
//     );
//     form.classList.add("hidden");
//     projects.push(newProject);
//     projectsList.append(createProjectHTMLElement(newProject));
// })

// cancelAddprojectBtn.addEventListener("click", ()=> form.classList.add("hidden"));



