
import Project from "./project";

const projects = [new Project("General")];
const projectsList = document.querySelector(".projects-list");
projectsList.append(createProjectHTMLElement(projects[0]));






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
    return projectElement
}

console.log(projectsList);

export {projects, projectsList, createProjectHTMLElement};