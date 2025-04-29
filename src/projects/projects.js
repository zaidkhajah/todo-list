
class Project {
    constructor(name = "untitled", color = "#000000", creationDate = new Date()) {
        this.name = name;
        this.creationDate = creationDate;
        this.color = color;
        this.todoList = [];
        this.id = crypto.randomUUID();
    }
    add(todo) {
        this.todoList.push(todo);
    }
    remove(todo) {
        const index = this.todoList.findIndex(item => item.id === todo.id);
        if (index === -1) return;
        this.todoList.splice(index, 1);
    }
}

const projects = [new Project("General")];
let activeProject = projects[0];

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
        projectElement.remove();
        const index = projects.findIndex( item => item.id === project.id);
        projects.splice(index, 1);
        console.log(projects);
    });

    projectElement.append(projectColor, projectName, projectDelete);
    return projectElement;
}

const setActiveProject = newActiveProject => activeProject = newActiveProject;
const getActiveProject = () => activeProject;

export {Project, setActiveProject, getActiveProject, projects, createProjectHTMLElement};